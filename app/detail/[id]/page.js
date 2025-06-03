import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export const dynamic = "force-dynamic";

export default async function Detail(props) {
  const { id } = await props.params;
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(id) });

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <h4>{result.content}</h4>
      <Comment _id={result._id.toString()} />
    </div>
  );
}
