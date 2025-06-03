
import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic'


export default async function List() {
  const db = (await connectDB).db("forum"); // 데이터베이스 접속 forum db접속
  let result = await db.collection("post").find().toArray(); // post안에있는 글 array로 꺼내오기

  const safeResult = result.map(post => ({
    ...post,
    _id: post._id.toString(),
  }));

  return (
    <div className="list-bg">
      <ListItem result={safeResult}/>
    </div>
  );
}
