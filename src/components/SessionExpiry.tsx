'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Spinner from '@/components/spinner/Spinner';
import { EXPIRES_INTERVAL_TIME } from '@/configs/constants';

/**
 * session expiration check component
 * @constructor
 */
export default function SessionExpiry({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();

  useEffect((): (() => void) => {
    const checkSessionExpiry = async (): Promise<void> => {
      if (status === 'authenticated' && session?.expires) {
        const now = new Date();
        const expiresAt = new Date(session.expires);
        if (now >= expiresAt) await signOut();
      }
    };

    const intervalId = setInterval(checkSessionExpiry, EXPIRES_INTERVAL_TIME);
    return (): void => clearInterval(intervalId);
  }, [session, status, router]);

  if (status === 'loading')
    return (
      <Spinner
        spinnerType="MoonLoader"
        loading={status === 'loading'}
        color="#000"
        size={80}
        cssOverride={{ top: '50%', left: '50%' }}
      />
    );
  return <>{children}</>;
}
