import { useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { webhookAxiosInstance, workflowAxiosInstance } from '@/services/apiClient';
import { API_ENDPOINTS, WORKFLOW_ACTION } from '@/configs/constants';
import { WorkflowAPI } from '@/services/workflow/workflowServiceTypes';
import { CreateWorkflowRes, FlowNode, FlowObjectCommonRes, WorkflowRequest } from '@/components/workflow/xyflowTypes';

export function workflowAPI(): WorkflowAPI {
  const callCreateWorkflow = async (
    workflowData: WorkflowRequest<typeof WORKFLOW_ACTION.CREATE_WORK_FLOW>
  ): Promise<AxiosResponse<CreateWorkflowRes>> => {
    return await workflowAxiosInstance.post(API_ENDPOINTS.WORK_FLOW, workflowData);
  };

  const callInsertObject = useCallback(
    async (
      flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.INSERT_FLOW_OBJECT>
    ): Promise<AxiosResponse<FlowObjectCommonRes>> => {
      return await workflowAxiosInstance.post(API_ENDPOINTS.WORK_FLOW, flowObjectData);
    },
    []
  );

  const callUpdateObject = useCallback(
    async (
      flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.UPDATE_FLOW_OBJECT>
    ): Promise<AxiosResponse<FlowObjectCommonRes>> => {
      return await workflowAxiosInstance.patch(API_ENDPOINTS.WORK_FLOW, flowObjectData);
    },
    []
  );

  const callDeleteObject = useCallback(
    async (
      flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.DELETE_FLOW_OBJECT>
    ): Promise<AxiosResponse<FlowObjectCommonRes>> => {
      return await workflowAxiosInstance.delete(API_ENDPOINTS.WORK_FLOW, { params: flowObjectData });
    },
    []
  );

  const sendWorkflowToWebhook = async (flowObjectData: FlowNode): Promise<AxiosResponse> => {
    try {
      const response = await webhookAxiosInstance.post('/nitf0rhu1m2c7q4nuwnyifn3yifpgnga', flowObjectData);
      console.log('Webhook Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending Webhook:', error);
      throw error;
    }
  };
  return { callCreateWorkflow, callInsertObject, callUpdateObject, callDeleteObject, sendWorkflowToWebhook };
}
