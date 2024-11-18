import React, { ChangeEvent, useState } from 'react';
import { UseState } from '@/types/common';
import styles from '@/components/login/login-form.module.scss';
import GoogleLogin from '@/components/login/GoogleLogin';
import LoginHeader from '@/components/login/LoginHeader';

/**
 * Login related processing components
 * @constructor
 */
export default function LoginForm(): React.JSX.Element {
  const [email, setEmail]: UseState<string> = useState<string>('');
  const [password, setPassword]: UseState<string> = useState<string>('');
  const [errorMessage, setErrorMessage]: UseState<string> = useState<string>('');

  const loginSubmit = (e: React.FormEvent): void => {
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
      <header>
        <LoginHeader />
      </header>

      <main>
        <form onSubmit={loginSubmit}>
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

          <button type="submit" className={styles.loginBtn}>
            이메일로 로그인
          </button>
        </form>
      </main>

      <nav>
        <a href="/signup" className={styles.signUp}>
          회원가입
        </a>
      </nav>

      <footer>
        <div className={styles.separator}>간편 로그인</div>
        <div className={styles.socialLoginArea}>
          <GoogleLogin />
        </div>
      </footer>
    </div>
  );
}
