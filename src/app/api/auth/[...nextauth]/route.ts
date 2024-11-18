import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { googleSignIn } from '@/services/googleAuth/googleAuthService';
import { EXPIRES_AT } from '@/configs/constants';
import { JWT } from 'next-auth/jwt';
import { Account, Session } from 'next-auth/index';
import { User } from 'next-auth/core/types';
import type { AdapterUser } from 'next-auth/adapters';

const authOptions: NextAuthOptions = {
  // Authentication providers setup
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: EXPIRES_AT
  },
  callbacks: {
    // JWT token callback function after login
    async jwt({ token, account }: { token: JWT; account: Account | null }): Promise<JWT> {
      if (account?.access_token) token.accessToken = account.access_token;
      if (account?.expires_at && !token.expires_at) token.expires_at = account.expires_at;
      return token;
    },
    // Session callback function after login
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token?.accessToken) session.accessToken = token.accessToken as string;
      return session;
    },
    // Callback function executed after login
    async signIn({ user, account }: { user: User | AdapterUser; account: Account | null }): Promise<boolean> {
      if (account?.provider === 'google') {
        await googleSignIn({ name: user.name!, email: user.email!, googleId: account.providerAccountId });
      }

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
