import React from 'react';
import { signIn } from 'next-auth/react';
import styles from '@/app/styles/login-form.module.scss';

/**
 * Google OAuth Login
 * @constructor
 */
export default function GoogleLogin(): React.JSX.Element {
  const googleLoginClick = async (): Promise<void> => {
    await signIn('google', { callbackUrl: '/workflow' });
  };
  return (
    <div className={styles.socialLoginArea}>
      <button className={styles.googleLogin} onClick={googleLoginClick}>
        <img className={styles.googleLoginImg} src="/login_google.png" alt="google_login" />
      </button>
    </div>
  );
}
