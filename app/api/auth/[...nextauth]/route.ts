import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authorize } from '../../config';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const nextAuth = await authorize({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: nextAuth.user.id,
            email: nextAuth.user.email,
            name: nextAuth.user.name,
            accessToken: nextAuth.token
          };
        } catch (error) {
          console.error('Erro na autenticação:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: '/',
    error: '/auth/error'
  }
});

export { handler as GET, handler as POST }; 