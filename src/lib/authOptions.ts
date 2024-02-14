import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    secret: process.env.SECRET,
    // @ts-ignore
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},

            async authorize(credentials, req) {
                // desectructuramos el objeto 
                const {email, password} = credentials as {
                    email: string, 
                    password: string, 
                };
                if(email !== 'admin@gmail.com' || password !== "admin123"){
                    return null;
                }
                // si todo va bien
                return {id:'1', name:'UserAdmin', email:"admin@gmail.com"}
            },

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages:{
        signIn:'/auth/signin',
    }

}

