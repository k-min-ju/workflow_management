import React, { useCallback, useRef, useState } from 'react';
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
import { Connection } from '@xyflow/system/dist/esm/types/general';
import { UseRef, UseState } from '@/types/common';
import { FLOW_OBJECT_COLOR_KEY, FLOW_OBJECT_COLOR_VALUE, FlowEdge, FlowNode } from '@/types/xyflow';
import '@xyflow/react/dist/style.css';
import styles from '@/app/components/workflow/workflow.module.scss';
import { FLOW_OBJECT_COLORS } from '@/app/configs/constants';
import Sidebar from '@/app/components/workflow/Sidebar';

export default function XYFlow(): React.JSX.Element {
  const initialNodes: FlowNode[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
      style: { backgroundColor: FLOW_OBJECT_COLORS.input }
    },
    {
      id: '2',
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
      style: { backgroundColor: FLOW_OBJECT_COLORS.other }
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
      style: { backgroundColor: FLOW_OBJECT_COLORS.output }
    }
  ];
  const initialEdges: FlowEdge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true }
  ];

  const flowWrapperRef: UseRef<HTMLDivElement> = useRef(null);
  const [nodes, setNodes]: UseState<FlowNode[]> = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges]: UseState<FlowEdge[]> = useState<FlowEdge[]>(initialEdges);
  // const { deleteElements } = useReactFlow();

  // const getId = (): string => `${FLOW_NODE_PREFIX}-${new Date().getTime()}`;

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

  return (
    <ReactFlowProvider>
      <section ref={flowWrapperRef} className={styles.mainContent}>
        <aside>
          <Sidebar />
        </aside>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#dadada" variant={BackgroundVariant.Lines} />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          <Controls className={styles.controls}></Controls>
        </ReactFlow>
      </section>
    </ReactFlowProvider>
  );
}
