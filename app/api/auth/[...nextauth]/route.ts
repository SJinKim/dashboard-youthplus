import { prisma } from '@/prisma';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Signin',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // no user check
        if (!user) {
          return null;
        }

        //bcryt compare
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        // check if password is valid
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          admin: user.admin,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('SESSION Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          admin: token.admin,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      // if user just logged in
      if (user) {
        const prismaUser = user as unknown as User;
        return {
          ...token,
          id: prismaUser.id,
          admin: prismaUser.admin,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
