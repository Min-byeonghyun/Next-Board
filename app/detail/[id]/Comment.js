"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((result) => {
        setData(result);
      });
  }, [props._id]);

  return (
    <div>
      <hr></hr>
      <div>댓글목록 보여줄 부분</div>
      {data.length > 0
        ? data.map((data, i) => <p key={i}>{data.content}</p>)
        : "댓글없음"}
      <input
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props._id }),
          })
            .then((r) => r.json())
            .then((newComment) => {
              setData((prevData) => [...prevData, newComment]);
              setComment("");
            });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
