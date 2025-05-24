
import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum"); // 데이터베이스 접속 forum db접속
  let result = await db.collection("post").find().toArray(); // post안에있는 글 array로 꺼내오기

  return (
    <div className="list-bg">
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={`/detail/${result[i]._id}`}><h4>{result[i].title}</h4></Link>
          
          <p>1월 1일</p>
          <p>{result[i].content}</p>
        </div>
      ))}
    </div>
  );
}
