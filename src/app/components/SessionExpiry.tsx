'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { EXPIRES_INTERVAL_TIME } from '@/app/configs/constants';

/**
 * session expiration check component
 * @constructor
 */
export default function SessionExpiry(): null {
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

    const intervalId = setInterval(async (): Promise<void> => {
      await checkSessionExpiry();
    }, EXPIRES_INTERVAL_TIME);

    return (): void => clearInterval(intervalId);
  }, [session, status, router]);

  return null;
}
