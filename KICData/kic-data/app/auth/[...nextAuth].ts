// next-auth.ts

import { NextAuthOptions } from 'next-auth';


const options: NextAuthOptions = {
  providers: [],
  callbacks: {
      async session({session, token, user}) {
      session.user = user;
      return session;
    },
      async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // Add other user properties as needed
      }
      return token;
    },
  },
};

export default options;
