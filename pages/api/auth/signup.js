import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // 1. 빈 비밀번호 검사
    if (!password || password.trim() === "") {
      return res.status(400).json("비밀번호를 입력해주세요.");
    }

    // 2. 기존 아이디 존재 여부 확인
    const db = (await connectDB).db("forum");
    const existingUser = await db.collection("user_cred").findOne({ email });

    if (existingUser) {
      return res.status(409).json("이미 존재하는 아이디입니다.");
    }

    // 3. 비밀번호 해시화 및 저장
    const hash = await bcrypt.hash(password, 10);
    await db.collection("user_cred").insertOne({
      ...req.body,
      password: hash,
    });

    return res.status(200).redirect('/');
  }

  // 잘못된 메서드 처리
  res.status(405).json("허용되지 않은 요청입니다.");
}