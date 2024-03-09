import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import JWTParse from "../../Util/JWTParse";
import getCookie from "../../Util/getCookie";
import axios from 'axios'

function Post({ postsData }) {
  const [userData, setUserData] = useState({
    userId: "",
    username: "",
    fullname: "",
  });

  const getUserData = async () => {
    try {
      const token = getCookie("access_token");
      const decodedJWT = JWTParse(token);
      setUserData(decodedJWT);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLikes = async () => {
    const likedPostData = {
      userId: userData.id,
      likedPost: postsData.idPost
    }
    await axios.post("//localhost:8000/api/communities/likePost", likedPostData, {withCredentials: true})
  };

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
      <div className="flex gap-2">
        <button onClick={handleLikes} className="text-pink text-2xl">
          <AiFillLike />
        </button>
        <div className="flex gap-1 text-pink">
          {postsData._count.likes}
          <p>likes</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
