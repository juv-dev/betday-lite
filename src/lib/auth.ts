import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Demo Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "demo" },
        password: { label: "Password", type: "password", placeholder: "demo" },
      },
      async authorize(credentials) {
        // Simulación: acepta cualquier usuario con password "demo"
        if (credentials?.password === "demo") {
          return {
            id: "user-1",
            name: credentials.username as string,
            email: `${credentials.username}@betday.com`,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
