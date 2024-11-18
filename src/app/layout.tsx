import React from 'react';
import CustomSessionProvider from '@/context/CustomSessionProvider';
import SessionExpiry from '@/components/SessionExpiry';
import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="ko">
      <body>
        <CustomSessionProvider>
          <SessionExpiry>{children}</SessionExpiry>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
