import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";

export default async function Home() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return <div>홈</div>;
}
