import NextAuth from "next-auth"
import type {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import {fetchCurrentUser} from "@/app/helpers/authenticate"
import { DefaultSession } from "@/types/types"
import {Adapter} from "next-auth/adapters"




const Options= {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialProvider({
            name: "Credentials",
            credentials: {
              
            
                email: {label:'Username', type:"text", placeholder:"Enter your credentials"},
                password: {label:'Username', type:"text", placeholder:"Enter your credentials"},
               
            },
        

            async authorize(credentials:any, req: any) {
                try {
                    const { email, password } = credentials;
                    const response = await fetchCurrentUser(email ?? '', password ?? "");
                    
                    // If authentication fails, return null
                    if (response === null) {
                        return null;
                    }
                    console.log(response, 'kiii')
                    // console.log(response,"hi")
                    // If authentication succeeds, return the user data and include the refresh token in the session
                    return response

                } catch (error) {
                    console.error('Error:', error);
                    return null;
                }
            }


           
        })
        
    ],
    pages: {
        signIn: "/auth/singup",
        newUser: "/auth/singup",
    },
    secret: process.env.NEXTAUTH_SECRET,
  
   
        
    callbacks: {
         async jwt({token, user}: any) {
      
        if(user) {
           token = user
            }
    console.log(user,'jiiii')
        return token
   },
        async session({session, token}:any) {
            if(token) {
                session.user = token
            }
            console.log(session)
            return session;
    }

    }
   
}
const  handlers  = NextAuth(Options)

export {handlers as GET, handlers as POST} 


