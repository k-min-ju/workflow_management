import React, { CSSProperties } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { FIREBASE_COLLECTION, FLOW_OBJECT_COLORS, WORKFLOW_ACTION_DATA_MAP } from '@/app/configs/constants';
import { SetState } from '@/types/common';

export interface HeaderProps {
  setWorkflowId: SetState<string>;
}

export interface XYFlowProps {
  workflowId: string;
}

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

export type WorkflowAction = keyof typeof WORKFLOW_ACTION_DATA_MAP;

type PickObjectType = Pick<typeof FIREBASE_COLLECTION, 'NODE' | 'EDGE'>;

export type ObjectType = PickObjectType[keyof PickObjectType];

export interface RequiredWorkflow {
  workflowId: string;
}

export interface CreateWorkflowRes extends RequiredWorkflow {}

export interface GetWorkflowData {}

export interface CreateWorkflowData {
  workflowTitle: string;
  email: string;
}

export interface FlowObjectCommonRes {
  message: string;
}

export interface InsertFlowObjectData<T extends ObjectType> extends RequiredWorkflow {
  objectType: T;
  objectData: T extends 'node' ? FlowNode : T extends 'edge' ? FlowEdge : never;
}

export interface UpdateFlowObjectData<T extends ObjectType> extends RequiredWorkflow {
  objectType: T;
  objectData: T extends 'node' ? Partial<FlowNode> : T extends 'edge' ? Partial<FlowEdge> : never;
}

export interface DeleteFlowObjectData extends RequiredWorkflow {
  objectType: ObjectType;
  nodeId?: string;
  edgeId?: string[];
}

export type WorkflowActionData = {
  [K in keyof typeof WORKFLOW_ACTION_DATA_MAP]: (typeof WORKFLOW_ACTION_DATA_MAP)[K];
};

export interface WorkflowRequest<T extends WorkflowAction> {
  action: T;
  data: WorkflowActionData[T];
}
