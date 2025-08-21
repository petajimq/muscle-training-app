import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//認証API
const handler = NextAuth({
  providers: [
    //Google認証を追加
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // DBなしのjwtを指定
  },
});

export { handler as GET, handler as POST };
