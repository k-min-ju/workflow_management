import React, { MouseEvent } from 'react';
import { signIn } from 'next-auth/react';
import styles from '@/components/login/login-form.module.scss';

/**
 * Google OAuth Login
 * @constructor
 */
export default function GoogleLogin(): React.JSX.Element {
  const googleLoginClick = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
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
