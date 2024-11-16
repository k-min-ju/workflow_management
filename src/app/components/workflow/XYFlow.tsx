import React, { DragEvent, useCallback, useRef, useState } from 'react';
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
import { XYPosition } from '@xyflow/system';
import { FLOW_OBJECT_COLOR_KEY, FLOW_OBJECT_COLOR_VALUE, FlowEdge, FlowNode } from '@/types/xyflow';
import type { ReactFlowInstance } from '@xyflow/react/dist/esm/types';
import { Connection } from '@xyflow/system/dist/esm/types/general';
import Sidebar from '@/app/components/workflow/Sidebar';
import { UseRef, UseState } from '@/types/common';
import { DATA_TRANSFER_TYPE, FLOW_NODE_PREFIX, FLOW_OBJECT_COLORS } from '@/app/configs/constants';
import '@xyflow/react/dist/style.css';
import styles from '@/app/components/workflow/workflow.module.scss';

export default function XYFlow(): React.JSX.Element {
  const getId = (): string => `${FLOW_NODE_PREFIX}-${new Date().getTime()}`;
  const sampleNodes: FlowNode[] = [
    {
      id: getId(),
      type: 'input',
      data: { label: 'input node' },
      position: { x: 0, y: 0 },
      style: { backgroundColor: FLOW_OBJECT_COLORS.input }
    }
  ];

  const [nodes, setNodes]: UseState<FlowNode[]> = useState<FlowNode[]>(sampleNodes);
  const [edges, setEdges]: UseState<FlowEdge[]> = useState<FlowEdge[]>([]);
  const [XYflowInstance, setXYflowInstance]: UseState<ReactFlowInstance<FlowNode, FlowEdge> | null> =
    useState<ReactFlowInstance<FlowNode, FlowEdge> | null>(null);
  const flowWrapperRef: UseRef<HTMLDivElement> = useRef(null);

  const onInit = (instance: ReactFlowInstance<FlowNode, FlowEdge>): void => {
    setXYflowInstance(instance);
  };

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
    (event: DragEvent): void => {
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
      setNodes((nds: FlowNode[]): FlowNode[] => nds.concat(newNode));
    },
    [XYflowInstance]
  );

  const onDragOver = useCallback((event: DragEvent): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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

  console.log(nodes);
  console.log(edges);

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
