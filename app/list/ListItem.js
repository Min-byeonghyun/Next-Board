"use client";
import Link from "next/link";

export default function ListItem(props) {
  return (
    <div>
      {props.result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={`/detail/${props.result[i]._id}`}>
            <h4>{props.result[i].title}</h4>
          </Link>

          <p>1월 1일</p>
          <p>{props.result[i].content}</p>
          <Link href={`/edit/${props.result[i]._id}`} className="list-btn">
            ✏️
          </Link>
          <span
            onClick={() => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[i]._id,
              })
                .then((r) => {
                  return r.json();
                })
                .then((r) => {
                  console.log(r);
                });
            }}
          >
            🗑️
          </span>
        </div>
      ))}
    </div>
  );
}
