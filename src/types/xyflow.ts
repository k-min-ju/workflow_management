import React, { CSSProperties } from 'react';

export interface FlowNode {
  id: string;
  type?: string;
  data: {
    label: string | React.JSX.Element;
  };
  position: {
    x: number;
    y: number;
  };
  style?: CSSProperties;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}
