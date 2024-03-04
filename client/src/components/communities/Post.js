import React from "react";

function Post({ postsData }) {
  return (
    <div className="flex flex-col gap-3 border-2 border-purple p-4 rounded-lg hover:scale-[101%] transition-all ease-in-out h-max">
      <div className="flex items-center gap-2">
        <div className="text-pink font-semibold text-3xl">
          {postsData.title}
        </div>
        <div className="text-sm px-2 text-pink bg-secondary-dark">
          #{postsData.tag}
        </div>
      </div>

      <div className="text-pink text-lg">{postsData.content}</div>

      <div className="flex gap-4 justify-between bottom-0 items-end">
        <div className="flex">
          <p className="text-sm text-purple">
            Posted by{" "}
            <span className="text-pink">{postsData.author.username}</span>
          </p>
        </div>
        <p className="text-sm text-purple">
          {postsData.createdAt
            .substr(0, 10)
            .concat(" ", postsData.createdAt.substr(11, 5))}
        </p>
      </div>
    </div>
  );
}

export default Post;
