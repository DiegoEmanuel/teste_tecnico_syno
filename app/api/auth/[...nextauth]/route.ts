import NextAuth from "next-auth";
import { credentials } from "@/app/api/config";

const handler = NextAuth({
  providers: [
    credentials
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  debug: true, // Ative isso temporariamente para ver logs detalhados
});

export { handler as GET, handler as POST }; 