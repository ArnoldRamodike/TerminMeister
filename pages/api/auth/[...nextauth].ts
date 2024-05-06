import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions} from 'next-auth'
import GithubProviders from 'next-auth/providers/github'
import GoogleProviders from 'next-auth/providers/google'
import CredentialsProviders from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProviders({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProviders({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProviders({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials')
                }

                const user  = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.hashedpassword) {
                    throw new Error('Invalid Credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password , user.hashedpassword
                );
                if (!isCorrectPassword) {
                    throw new Error('Invalid Credentials')
                }

                return user;
            }
        })
    ],

    pages: {
        signIn: '/',

    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);