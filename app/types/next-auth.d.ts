import 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
  }
  
  interface Session {
    user: {
      email: string;
      accessToken: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
  }
} 