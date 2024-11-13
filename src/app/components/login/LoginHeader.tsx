import React from 'react';
import styles from '@/app/styles/login-form.module.scss';

/**
 * Login Header Component
 * @constructor
 */
export default function LoginHeader(): React.JSX.Element {
  return (
    <div className={styles.loginTitle}>
      <h1 className={styles.title}>Workflow Management</h1>
    </div>
  );
}
