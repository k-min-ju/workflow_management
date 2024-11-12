'use client';
import React, { ChangeEvent, useState } from 'react';
import { signIn, SignInResponse, useSession } from 'next-auth/react';
import { UseState } from '@/types/common';
import styles from '@/app/styles/login-form.module.scss';

export default function LoginForm(): React.JSX.Element {
  const { data: session } = useSession();
  const [email, setEmail]: UseState<string> = useState<string>('');
  const [password, setPassword]: UseState<string> = useState<string>('');
  const [errorMessage, setErrorMessage]: UseState<string> = useState<string>('');

  console.log('session', session);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('아이디를 입력해 주세요');
    } else if (!password) {
      setErrorMessage('비밀번호를 입력해 주세요.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className={styles.loginForm}>
      <div className={styles.loginTitle}>
        <h1 className={styles.title}>Workflow Management</h1>
      </div>
      <input
        type="text"
        placeholder="이메일을 입력하세요."
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
      />

      {errorMessage && (
        <div className={styles.errorMessage}>
          <div className={styles.message}>{errorMessage}</div>
        </div>
      )}

      <button onClick={handleSubmit}>이메일로 로그인</button>

      <a href="/signup" className={styles.signUp}>
        회원가입
      </a>
      <div className={styles.separator}>간편 로그인</div>
      <div className={styles.socialLoginArea}>
        <button className={styles.googleLogin} onClick={(): Promise<SignInResponse | undefined> => signIn('google')}>
          <img className={styles.googleLoginImg} src="/login_google.png" alt="google_login" />
        </button>
      </div>
    </div>
  );
}
