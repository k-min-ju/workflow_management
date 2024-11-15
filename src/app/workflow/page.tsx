'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Header from '@/app/components/workflow/Header';
import XYFlow from '@/app/components/workflow/XYFlow';
import styles from '@/app/components/workflow/workflow.module.scss';

export default function Workflow(): React.JSX.Element {
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();

  useEffect((): void => {
    if (!session && status !== 'loading') {
      router.replace('/login');
    }
  }, [session, status, router]);

  return (
    <div className={styles.workflowContainer}>
      <Header />
      <XYFlow />
    </div>
  );
}
