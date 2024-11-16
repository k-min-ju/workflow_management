import React, { CSSProperties } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { FLOW_OBJECT_COLORS } from '@/app/configs/constants';

export interface FlowNode {
  id: string;
  type?: FLOW_OBJECT_COLOR_KEY;
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

export type FLOW_OBJECT_COLOR_KEY = keyof typeof FLOW_OBJECT_COLORS;
export type FLOW_OBJECT_COLOR_VALUE = (typeof FLOW_OBJECT_COLORS)[keyof typeof FLOW_OBJECT_COLORS];

export interface CreateNodeObjectProps {
  className: string;
  muiIcon: React.ReactElement<SvgIconComponent>;
  labelText: string;
  nodeType: FLOW_OBJECT_COLOR_KEY;
}
