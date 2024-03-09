import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Post from "../components/communities/Post";

function PostsByUser() {
  const location = useLocation();

  const [postsByUserData, setPostsByUserData] = useState([]);
  const [error, setError] = useState();

  const getAllPostsByUser = async () => {
    try {
      await axios
        .get(
          `http://localhost:8000/api/communities/user/${location.state.username}`,
          { withCredentials: true }
        )
        .then((response) => setPostsByUserData(response.data));
    } catch (error) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    getAllPostsByUser();
  }, [postsByUserData]);

  return (
    <div className="flex min-h-screen bg-primary-dark">
      {error ? (
        <div className="flex flex-col justify-center items-center mx-auto text-3xl font-semibold text-pink">
          {error}
          <Link to={"/dashboard"} className="text-xl font-light underline">
            dashboard
          </Link>
        </div>
      ) : (
        <div className="w-full px-[12%] py-[5%] flex flex-col gap-4">
          <h1 className="text-2xl text-pink">
            <span className="text-purple">Posts by </span>"
            {location.state.username}"
          </h1>
          {postsByUserData.map((post, index) => (
            <Post key={index} postsData={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostsByUser;
