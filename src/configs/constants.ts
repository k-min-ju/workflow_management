import {
  CreateWorkflowData,
  DeleteFlowObjectData,
  GetWorkflowData,
  InsertFlowObjectData,
  UpdateFlowObjectData
} from '@/components/workflow/xyflowTypes';

export const EXPIRES_AT: number = 60 * 60; // 1 hour
export const EXPIRES_INTERVAL_TIME: number = 30000; // 30sec
export const FLOW_OBJECT_COLORS = {
  input: '#007BFF',
  output: '#28A745',
  other: '#c90054'
} as const;
export const FLOW_NODE_PREFIX: string = 'NODE';
export const DATA_TRANSFER_TYPE = 'application/workflow';
export const FIREBASE_COLLECTION = {
  GOOGLE_USER: 'googleUser',
  WORK_FLOW: 'workflow',
  NODE: 'node',
  EDGE: 'edge'
} as const;
export const WORKFLOW_ACTION = {
  GET_WORK_FLOW: 'getWorkflow',
  CREATE_WORK_FLOW: 'createWorkflow',
  INSERT_FLOW_OBJECT: 'insertFlowObject',
  UPDATE_FLOW_OBJECT: 'updateFlowObject',
  DELETE_FLOW_OBJECT: 'deleteFlowObject'
} as const;
export const WORKFLOW_ACTION_DATA_MAP = {
  [WORKFLOW_ACTION.GET_WORK_FLOW]: {} as GetWorkflowData,
  [WORKFLOW_ACTION.CREATE_WORK_FLOW]: {} as CreateWorkflowData,
  [WORKFLOW_ACTION.INSERT_FLOW_OBJECT]: {} as InsertFlowObjectData<'node'> | InsertFlowObjectData<'edge'>,
  [WORKFLOW_ACTION.UPDATE_FLOW_OBJECT]: {} as UpdateFlowObjectData<'node'> | InsertFlowObjectData<'edge'>,
  [WORKFLOW_ACTION.DELETE_FLOW_OBJECT]: {} as DeleteFlowObjectData
} as const;
export const API_ENDPOINTS = {
  WORK_FLOW: '/api/workflow',
  GOOGLE_AUTH: '/api/auth/google'
} as const;
