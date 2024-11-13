'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import styles from '@/app/styles/workflow.module.scss';

export default function Workflow(): React.JSX.Element {
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();

  console.log('session', session);

  useEffect((): void => {
    if (!session && status !== 'loading') {
      router.replace('/login');
    }
  }, [session, status, router]);

  return (
    <div className={styles.workflowContainer}>
      <header className={styles.header}>
        <div className={styles.workflowInfo}>
          <div className={styles.workflowTitle}>워크플로우 제목</div>
          <div className={styles.workflowDate}>생성일자: 2024-11-13</div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.saveButton}>저장하기</button>
          <div className={styles.userName}>
            {session?.user?.image && <img className={styles.userImage} src={session?.user?.image} alt="user_image" />}
          </div>
        </div>
      </header>
      <div className={styles.mainContent}></div>
    </div>
  );
}
