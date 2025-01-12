import React from "react";
const baseURL = import.meta.env.VITE_PIC_URL;

const Post = ({ title, author, summary, cover, createdAt, _id }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="md:1/2 flex item-center justify-center">
        <a href={"/post/" + _id} className="href">
          <img
            src={`${cover}`}
            alt={title}
            className="w-full h-64 object-cover"
          />
        </a>
      </figure>
      <div className="p-6 md:1/2 flex flex-col justtify-between card-body">
        <a href={"/post/" + _id} className="href">
          <h2 className="card-title">{title}</h2>
        </a>
        <p>
          {author.username}-{createdAt}
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
