import NextAuth, { Account, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth/core/types';
import GoogleProvider from 'next-auth/providers/google';
import type { AdapterUser } from 'next-auth/adapters';
import type { AuthOptions } from 'next-auth/src';
import db from '@/firebase/config';
import { doc, DocumentReference, setDoc } from '@firebase/firestore';

const handler: AuthOptions = NextAuth({
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
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }): Promise<JWT> {
      if (account?.access_token) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async signIn({ user, account }: { user: User | AdapterUser; account: Account | null }): Promise<boolean> {
      if (account?.provider === 'google') {
        const userRef: DocumentReference = doc(db, 'users', user.email!);
        await setDoc(userRef, {
          name: user.name,
          email: user.email,
          image: user.image,
          googleId: account.providerAccountId
        });
      }
      return true;
    }
  }
});

export { handler as GET, handler as POST };
