import { useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/app/services/apiClient';
import { API_ENDPOINTS, WORKFLOW_ACTION } from '@/app/configs/constants';
import { CreateWorkflowRes, FlowObjectCommonRes, WorkflowRequest } from '@/types/xyflow';
import { WorkflowAPI } from '@/types/workflowService';

export function workflowAPI(): WorkflowAPI {
  const callCreateWorkflow = async (
    workflowData: WorkflowRequest<typeof WORKFLOW_ACTION.CREATE_WORK_FLOW>
  ): Promise<AxiosResponse<CreateWorkflowRes>> => {
    return await axiosInstance.post(API_ENDPOINTS.WORK_FLOW, workflowData);
  };

  const callInsertObject = useCallback(
    async (
      flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.INSERT_FLOW_OBJECT>
    ): Promise<AxiosResponse<FlowObjectCommonRes>> => {
      return await axiosInstance.post(API_ENDPOINTS.WORK_FLOW, flowObjectData);
    },
    []
  );

  const callUpdateObject = useCallback(
    async (
      flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.UPDATE_FLOW_OBJECT>
    ): Promise<AxiosResponse<FlowObjectCommonRes>> => {
      return await axiosInstance.patch(API_ENDPOINTS.WORK_FLOW, flowObjectData);
    },
    []
  );

  const callDeleteObject = useCallback(
    async (
      flowObjectData: WorkflowRequest<typeof WORKFLOW_ACTION.DELETE_FLOW_OBJECT>
    ): Promise<AxiosResponse<FlowObjectCommonRes>> => {
      return await axiosInstance.delete(API_ENDPOINTS.WORK_FLOW, { params: flowObjectData });
    },
    []
  );
  return { callCreateWorkflow, callInsertObject, callUpdateObject, callDeleteObject };
}
