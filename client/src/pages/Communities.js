import React, { useEffect, useState } from "react";
import axios from "axios";
import Postbox from "../components/communities/Postbox";
import JWTParse from "../Util/JWTParse";
import Post from "../components/communities/Post";
import { IoClose } from "react-icons/io5";
import SearchBar from "../components/communities/SearchBar";

function Communities() {
  const [allPosts, setAllPosts] = useState([]);
  const [createPostModal, setCreatePostModal] = useState(false);

  const accToken = document.cookie.split(";")[1];
  const token = accToken.split("=")[1];

  const userLoggedInData = JWTParse(token);

  const handlerModal = () => {
    setCreatePostModal(!createPostModal);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const posts = await axios.get("http://localhost:8000/api/communities", {
        withCredentials: true,
      });
      setAllPosts(posts.data);
    };

    getAllPosts();
  }, [allPosts]);

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-pink">
          Find hottest topic at at our communities right now 🔥🔥
        </h1>

        <div className="flex items-center gap-4">
          <SearchBar />
          <button
            className="bg-pink px-3 py-2 rounded-md font-semibold text-primary-dark"
            onClick={handlerModal}
          >
            Create Post
          </button>
        </div>
        {}
      </div>

      <div className="grid gap-4 grid-cols-2">
        {allPosts.map((post) => (
          <Post key={post.id} postsData={post} />
        ))}
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
    </div>
  );
}

export default Communities;
