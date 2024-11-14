'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/components/login/LoginForm';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import styles from '@/app/components/login/login-form.module.scss';

/**
 * Login Parent Component
 * @constructor
 */
export default function Login(): React.JSX.Element {
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();

  useEffect((): void => {
    if (session && status === 'authenticated') {
      router.replace('/workflow');
    }
  }, [session, status]);
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
}
