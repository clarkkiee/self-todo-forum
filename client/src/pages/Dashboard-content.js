import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/communities/Post";
import MyPost from "../components/dashboard/MyPost";
import Postbox from "../components/communities/Postbox";
import JWTParse from "../Util/JWTParse";
import { IoClose } from "react-icons/io5";

function Dashboardcontent({ data }) {
  const [createPostModal, setCreatePostModal] = useState(false);

  const accToken = document.cookie.split(";")[1];
  const token = accToken.split("=")[1];

  const userLoggedInData = JWTParse(token);

  const handlerModal = () => {
    setCreatePostModal(!createPostModal);
  };

  return (
    <>
      <div className="flex flex-col gap-2 h-max">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-pink">
              Welcome, {data.username}
            </h1>
            <p className="text-purple font-semibold text-xl">Your Posts</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="bg-pink px-3 py-2 rounded-md font-semibold text-primary-dark"
              onClick={handlerModal}
            >
              Create Post
            </button>
          </div>
        </div>

        {createPostModal ? (
          <div className="absolute flex flex-col mx-auto left-[50%] -translate-x-[50%] top-[10%] bg-purple p-4 rounded-xl border-4 border-primary-dark shadow-2xl">
            <button
              className="text-primary-dark font-bold flex justify-end text-2xl my-1"
              onClick={handlerModal}
            >
              <IoClose />
            </button>
            <Postbox userdata={userLoggedInData} />
          </div>
        ) : (
          <div className="hidden">
            <Postbox userdata={userLoggedInData} />
          </div>
        )}

        <div className="grid gap-4 grid-cols-2 my-4">
          {data.posts.length === 0 && (
            <div className="text-2xl text-secondary-dark font-semibold">
              Looks a little quiet here. Make your first posts.
            </div>
          )}
          {data.posts.map((post, index) => (
            <MyPost key={index} postsData={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboardcontent;
