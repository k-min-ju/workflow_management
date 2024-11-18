import React, { DragEvent, type MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  EdgeChange,
  MiniMap,
  NodeChange,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import { AxiosResponse } from 'axios';
import Sidebar from '@/components/workflow/Sidebar';
import { workflowAPI } from '@/services/workflow/workflowService';
import { DATA_TRANSFER_TYPE, FLOW_NODE_PREFIX, FLOW_OBJECT_COLORS, WORKFLOW_ACTION } from '@/configs/constants';
import { UseRef, UseState } from '@/types/common';
import { WorkflowAPI } from '@/services/workflow/workflowServiceTypes';
import { Connection } from '@xyflow/system/dist/esm/types/general';
import { XYPosition } from '@xyflow/system';
import type { ReactFlowInstance } from '@xyflow/react/dist/esm/types';
import {
  FLOW_OBJECT_COLOR_KEY,
  FLOW_OBJECT_COLOR_VALUE,
  FlowEdge,
  FlowNode,
  FlowObjectCommonRes,
  WorkflowRequest,
  XYFlowProps
} from '@/components/workflow/xyflowTypes';
import '@xyflow/react/dist/style.css';
import styles from '@/components/workflow/workflow.module.scss';

export default function XYFlow({ workflowId }: XYFlowProps): React.JSX.Element {
  const getId = useCallback((): string => `${FLOW_NODE_PREFIX}-${new Date().getTime()}`, []);
  const [nodes, setNodes]: UseState<FlowNode[]> = useState<FlowNode[]>([]);
  const [edges, setEdges]: UseState<FlowEdge[]> = useState<FlowEdge[]>([]);
  const [XYflowInstance, setXYflowInstance]: UseState<ReactFlowInstance<FlowNode, FlowEdge> | null> =
    useState<ReactFlowInstance<FlowNode, FlowEdge> | null>(null);
  const flowWrapperRef: UseRef<HTMLDivElement> = useRef(null);
  const { callInsertObject, callUpdateObject }: WorkflowAPI = workflowAPI();

  const addObject = useCallback(
    async (insertObjectParam: WorkflowRequest<typeof WORKFLOW_ACTION.INSERT_FLOW_OBJECT>, newNode: FlowNode) => {
      const insertResponse: AxiosResponse<FlowObjectCommonRes> = await callInsertObject(insertObjectParam);
      if (insertResponse.status === 200) setNodes((nds: FlowNode[]): FlowNode[] => nds.concat(newNode));
      // const res = await sendWorkflowToWebhook(newNode);
      // console.log('resresres', res);
    },
    []
  );

  const onInit = useCallback((instance: ReactFlowInstance<FlowNode, FlowEdge>): void => {
    setXYflowInstance(instance);
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange<FlowNode>[]): void =>
      setNodes((nds: FlowNode[]): FlowNode[] => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<FlowEdge>[]): void =>
      setEdges((eds: FlowEdge[]): FlowEdge[] => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection): void => setEdges((eds: FlowEdge[]): FlowEdge[] => addEdge(connection, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    async (event: DragEvent): Promise<void> => {
      event.preventDefault();

      const XYFlowBounds: DOMRect | undefined = flowWrapperRef.current?.getBoundingClientRect();
      if (!XYFlowBounds || !XYflowInstance) return;

      const type: FLOW_OBJECT_COLOR_KEY = event.dataTransfer.getData(DATA_TRANSFER_TYPE) as FLOW_OBJECT_COLOR_KEY;
      const position: XYPosition | undefined = XYflowInstance?.screenToFlowPosition({
        x: event.clientX - XYFlowBounds.left,
        y: event.clientY - XYFlowBounds.top
      });

      const newNode: FlowNode = {
        id: getId(),
        ...(type === 'input' || type === 'output' ? { type } : {}),
        position,
        data: { label: `${type} node` },
        style: { backgroundColor: FLOW_OBJECT_COLORS[type] }
      };

      const insertObjectParam: WorkflowRequest<typeof WORKFLOW_ACTION.INSERT_FLOW_OBJECT> = {
        action: WORKFLOW_ACTION.INSERT_FLOW_OBJECT,
        data: { workflowId, objectType: 'node', objectData: newNode as FlowNode }
      };
      await addObject(insertObjectParam, newNode);
    },
    [XYflowInstance, workflowId]
  );

  const onDragOver = useCallback((event: DragEvent): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDragStop = useCallback(
    async (_event: ReactMouseEvent, node: FlowNode) => {
      const { id, position }: FlowNode = node;
      const updateObjectParam: WorkflowRequest<typeof WORKFLOW_ACTION.UPDATE_FLOW_OBJECT> = {
        action: WORKFLOW_ACTION.UPDATE_FLOW_OBJECT,
        data: { workflowId, objectType: 'node', objectData: { id, position } }
      };
      await callUpdateObject(updateObjectParam);
    },
    [workflowId]
  );

  const nodeColor = (node: { type?: FLOW_OBJECT_COLOR_KEY | string }): FLOW_OBJECT_COLOR_VALUE => {
    switch (node.type) {
      case 'input':
        return FLOW_OBJECT_COLORS.input;
      case 'output':
        return FLOW_OBJECT_COLORS.output;
      default:
        return FLOW_OBJECT_COLORS.other;
    }
  };

  useEffect(() => {
    if (!workflowId) return;
    const sampleNode: FlowNode = {
      id: getId(),
      type: 'input',
      data: { label: 'input node' },
      position: { x: 0, y: 0 },
      style: { backgroundColor: FLOW_OBJECT_COLORS.input }
    };
    const insertObjectParam: WorkflowRequest<typeof WORKFLOW_ACTION.INSERT_FLOW_OBJECT> = {
      action: WORKFLOW_ACTION.INSERT_FLOW_OBJECT,
      data: { workflowId, objectType: 'node', objectData: sampleNode as FlowNode }
    };
    addObject(insertObjectParam, sampleNode).then();
  }, [workflowId]);

  return (
    <ReactFlowProvider>
      <section ref={flowWrapperRef} className={styles.mainContent}>
        <aside>
          <Sidebar />
        </aside>
        <ReactFlow
          onInit={onInit}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeDragStop={onNodeDragStop}
          fitView
        >
          <Background color="#dadada" variant={BackgroundVariant.Lines} />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          <Controls className={styles.controls} />
        </ReactFlow>
      </section>
    </ReactFlowProvider>
  );
}
