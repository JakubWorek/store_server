import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminsEmails = ['worekkuba@gmail.com']

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    session: ({session, token, user}) => {
      if(adminsEmails.includes(session?.user?.email)){
        return session;
      } else {
        return false;
      }
    },
  }
}


export default NextAuth(authOptions)

export async function isAdminRequest(req,res){
  const session = await getServerSession(req,res,authOptions);

  if (adminsEmails.includes(session?.user?.email)){
    return true;
  } else {
    throw 'Unauthorized';
  }
}