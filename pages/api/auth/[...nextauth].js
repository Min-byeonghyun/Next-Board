import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'
import { connectDB } from "@/util/database";


const client = (await connectDB).client;
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23liF4fXmS0iyvBvOP',
      clientSecret: '755237dc964290f3673f43b2a19bb0d441817935',
    }),
  ],
  secret : 'qwer1234',
  adapter : MongoDBAdapter(client),
};
export default NextAuth(authOptions); 