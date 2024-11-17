import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { AxiosResponse } from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import { WorkflowAPI } from '@/types/workflowService';
import { WORKFLOW_ACTION } from '@/app/configs/constants';
import { workflowAPI } from '@/app/services/workflow/workflowService';
import { CreateWorkflowRes, HeaderProps, WorkflowRequest } from '@/types/xyflow';
import { UseState } from '@/types/common';
import styles from '@/app/components/workflow/workflow.module.scss';

export default function Header({ setWorkflowId }: HeaderProps): React.JSX.Element {
  const { data: session, status } = useSession();
  const [workflowTitle]: UseState<string> = useState<string>('워크플로우 제목을 입력하세요.');
  const { callCreateWorkflow }: WorkflowAPI = workflowAPI();

  useEffect(() => {
    if (session && session.user) {
      const saveWorkflowParam: WorkflowRequest<typeof WORKFLOW_ACTION.CREATE_WORK_FLOW> = {
        action: WORKFLOW_ACTION.CREATE_WORK_FLOW,
        data: { workflowTitle, email: session.user.email! }
      };
      callCreateWorkflow(saveWorkflowParam).then((res: AxiosResponse<CreateWorkflowRes>) => {
        if (res.status === 200) setWorkflowId(res.data.workflowId);
      });
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.workflowInfo}>
        <div className={styles.workflowTitle}>{workflowTitle}</div>
        <div className={styles.workflowDate}>생성일자: 2024-11-13</div>
      </div>
      <div className={styles.headerRight}>
        <button className={styles.shareButton}>Share</button>
        <div className={styles.userName}>
          {status === 'authenticated' && session?.user?.image && (
            <img className={styles.userImage} src={session?.user?.image} alt="user_image" />
          )}
        </div>
        <LogoutIcon className={styles.signOut} onClick={(): Promise<void> => signOut()} />
      </div>
    </header>
  );
}
