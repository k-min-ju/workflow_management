import React, { useCallback, useState } from 'react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
  MiniMap,
  NodeChange,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import { Connection } from '@xyflow/system/dist/esm/types/general';
import { UseState } from '@/types/common';
import { FlowEdge, FlowNode } from '@/types/xyflow';
import '@xyflow/react/dist/style.css';
import styles from '@/app/components/workflow/workflow.module.scss';
import { FLOW_INPUT_COLOR, FLOW_OTHER_COLOR, FLOW_OUTPUT_COLOR } from '@/app/configs/constants';

export default function XYFlow(): React.JSX.Element {
  const initialNodes: FlowNode[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
      style: { backgroundColor: FLOW_INPUT_COLOR }
    },

    {
      id: '2',
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
      style: { backgroundColor: FLOW_OTHER_COLOR }
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
      style: { backgroundColor: FLOW_OUTPUT_COLOR }
    }
  ];
  const initialEdges: FlowEdge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true }
  ];

  const [nodes, setNodes]: UseState<FlowNode[]> = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges]: UseState<FlowEdge[]> = useState<FlowEdge[]>(initialEdges);

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

  const nodeColor = (node: { type?: string }): string => {
    switch (node.type) {
      case 'input':
        return FLOW_INPUT_COLOR;
      case 'output':
        return FLOW_OUTPUT_COLOR;
      default:
        return FLOW_OTHER_COLOR;
    }
  };

  return (
    <div className={styles.mainContent}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlowProvider>
    </div>
  );
}
