'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Header from '@/components/workflow/Header';
import XYFlow from '@/components/workflow/XYFlow';
import styles from '@/components/workflow/workflow.module.scss';
import { UseState } from '@/types/common';

export default function Workflow(): React.JSX.Element {
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();
  const [workflowId, setWorkflowId]: UseState<string> = useState<string>('');

  useEffect((): void => {
    if (!session && status !== 'loading') {
      router.replace('/login');
    }
  }, [session, status, router]);

  return (
    <div className={styles.workflowContainer}>
      <header>
        <Header setWorkflowId={setWorkflowId} />
      </header>
      <main>
        <XYFlow workflowId={workflowId} />
      </main>
    </div>
  );
}
