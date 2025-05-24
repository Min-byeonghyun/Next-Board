import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  res.status(200).json(result);
}

//api/list 로 api 요청시 db에 있는 정보 보내주기
