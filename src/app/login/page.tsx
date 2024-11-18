'use client';
import React from 'react';
import LoginForm from '@/components/login/LoginForm';
import styles from '@/components/login/login-form.module.scss';

/**
 * Login Parent Component
 * @constructor
 */
export default function Login(): React.JSX.Element {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
}
