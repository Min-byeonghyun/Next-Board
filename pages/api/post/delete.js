import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    // 로그인 여부 확인
    if (!session) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const db = (await connectDB).db('forum');

    // 게시글 정보 조회
    const post = await db.collection('post').findOne({ _id: new ObjectId(req.body) });

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    // 게시글 작성자와 현재 로그인 유저 비교
    if (post.author !== session.user.email) {
      return res.status(403).json({ message: '작성자만 삭제할 수 있습니다.' });
    }

    // 삭제 수행
    const result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body) });
    console.log('삭제 결과:', result);

    return res.status(200).json({ message: '삭제 완료', result });
  }

  res.status(405).json({ message: '허용되지 않은 메서드입니다.' });
}