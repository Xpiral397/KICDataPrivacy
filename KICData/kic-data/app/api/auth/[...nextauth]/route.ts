import NextAuth from "next-auth"
import type {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"




const Options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialProvider({
            name: "Credentials",
            credentials: {
                FirstName: {label:'FirstName', type:"text", placeholder:"Enter your credentials"},
                OtherName: {label:'OtherName', type:"text", placeholder:"Othername"},
                number: {label:'Username', type:"text", placeholder:"Enter your credentials"},
                email: {label:'Username', type:"text", placeholder:"Enter your credentials"},
                password: {label:'Username', type:"text", placeholder:"Enter your credentials"},
                gender: {label:'Username', type:"text", placeholder:"Enter your credentials"},
            },
            async authorize(credentials, req) {
                console.log('hi')
               return await new Promise(()=>{credentials: credentials})
           }
        })
        
    ],
    pages: {
        signIn: "/auth/singup",
        newUser: "/auth/singup",
    }
   
}
const  handlers  = NextAuth(Options)

export {handlers as GET, handlers as POST} 


