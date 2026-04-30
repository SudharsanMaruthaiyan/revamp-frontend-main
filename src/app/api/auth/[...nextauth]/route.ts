import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required.");
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              auth_type: "CREDENTIALS",
            }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            console.log(result.message.error)
            throw new Error(result.message.error);
          }

          const { user, token } = result.data;
          const { user_id, name, email } = user;
          const { access_token, refresh_token } = token;

          return {
            id: user_id,
            userId: user_id,
            name,
            email,
            accessToken: access_token,
            refreshToken: refresh_token,
          };
        } catch (err: any) {
          throw new Error(err?.message || "Something went wrong during login.");
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  pages: {
    signIn: "/", // Custom sign-in page
    error: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'google') {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email, auth_type: "GOOGLE" })
          });

          const backendData = await response.json();
          if (backendData.success === true) {
            const backendUser = backendData.data.user;
            const backendToken = backendData.data.token;

            user.id = backendUser.user_id;
            user.name = backendUser.name;
            user.email = backendUser.email;
            user.accessToken = backendToken.access_token;
            user.refreshToken = backendToken.refresh_token;

            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error('Error authenticating with backend:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // On initial sign in
      if (user) {
        // Add user info to token
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.access_token = user.accessToken;
        token.refresh_token = user.refreshToken;
      }

      // If session is being updated
      if (trigger === "update" && session?.user) {
        if (session.user.access_token) {
          token.access_token = session.user.access_token;
        }
        if (session.user.refresh_token) {
          token.refresh_token = session.user.refresh_token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add user info to session but exclude sensitive tokens
      session.user = {
        userId: token.id as string,
        name: token.name,
        email: token.email,
        access_token: token.access_token as string,
        refresh_token: token.refresh_token as string,
        // Don't expose tokens to client
      };

      // If there's an error in the token, add it to the session
      if (token.error) {
        session.error = token.error as string;
      }

      return session;
    }
  }
}

const  handler  = NextAuth(authOptions)
export { handler as GET, handler as POST };