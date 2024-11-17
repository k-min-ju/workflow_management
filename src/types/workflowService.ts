import { CreateWorkflowRes, FlowObjectCommonRes, WorkflowRequest } from '@/types/xyflow';
import { WORKFLOW_ACTION } from '@/app/configs/constants';
import { AxiosResponse } from 'axios';

export interface WorkflowAPI {
  callCreateWorkflow: (
    _workflowData: WorkflowRequest<typeof WORKFLOW_ACTION.CREATE_WORK_FLOW>
  ) => Promise<AxiosResponse<CreateWorkflowRes>>;
  callInsertObject: (
    _flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.INSERT_FLOW_OBJECT>
  ) => Promise<AxiosResponse<FlowObjectCommonRes>>;
  callUpdateObject: (
    _flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.UPDATE_FLOW_OBJECT>
  ) => Promise<AxiosResponse<FlowObjectCommonRes>>;
  callDeleteObject: (
    _flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.DELETE_FLOW_OBJECT>
  ) => Promise<AxiosResponse<FlowObjectCommonRes>>;
}
