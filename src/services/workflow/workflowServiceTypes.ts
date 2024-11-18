import { AxiosResponse } from 'axios';
import { WORKFLOW_ACTION } from '@/configs/constants';
import { CreateWorkflowRes, FlowNode, FlowObjectCommonRes, WorkflowRequest } from '@/components/workflow/xyflowTypes';

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
  sendWorkflowToWebhook: (_flowObjectData: FlowNode) => Promise<AxiosResponse>;
}
