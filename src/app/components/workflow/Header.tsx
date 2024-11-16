import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from '@/app/components/workflow/workflow.module.scss';

export default function Header(): React.JSX.Element {
  const { data: session, status } = useSession();
  return (
    <header className={styles.header}>
      <div className={styles.workflowInfo}>
        <div className={styles.workflowTitle}>워크플로우 제목</div>
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
