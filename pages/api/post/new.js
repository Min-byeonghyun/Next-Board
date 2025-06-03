import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req, res) {
  let session = await getServerSession(req, res , authOptions)
  if(session) {
    req.body.author = session.user.email
  }

  if(req.method == 'POST'){
    if (req.body.title == '') {
      return res.status(500).json('제목을 입력해주세요')
    } 
    const db = (await connectDB).db('forum')
    let result = await db.collection('post').insertOne(req.body) //document 하나 발행 insertOne().
    return res.status(200).redirect('/list') //성공시 리다이렉트;

  }
}




