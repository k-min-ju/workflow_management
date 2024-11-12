import React from 'react';
import LoginForm from '@/app/components/LoginForm';
import styles from '@/app/styles/login-form.module.scss';

export default function Login(): React.JSX.Element {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
}
