import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";
import getCookie from "../../Util/getCookie";
import JWTParse from "../../Util/JWTParse";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function MyPost({ postsData }) {
  const navigate = useNavigate();

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

  const handleClickDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will delete this posts permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteTask();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then(() => window.location.reload());
      }
    });
  };

  const handleDeleteTask = async () => {
    const userIdQuery = userData.id;
    // console.log(userIdQuery, postsData.idPost);
    await axios.delete(
      `http://localhost:8000/api/dashboard/delete?userId=${userIdQuery}&postId=${postsData.idPost}`,
      {
        withCredentials: true,
      }
    );
  };

  const handleEditTask = async () => {
    const userIdQuery = userData.id;
    // console.log(userIdQuery, postsData.idPost);
    navigate("/edit", {
      state: { userId: userIdQuery, postId: postsData.idPost },
    });
  };

  return (
    <div className="flex flex-col gap-3 border-2 border-purple p-4 rounded-lg hover:scale-[101%] transition-all ease-in-out h-max bg-primary-dark">
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
          <div className="flex gap-1">
            <button className="text-pink">
              <AiFillLike />
            </button>
            <div className="flex gap-1 text-pink">
              {postsData._count.likes}
              <p>likes</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-purple">
          {postsData.createdAt
            .substr(0, 10)
            .concat(" ", postsData.createdAt.substr(11, 5))}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="py-2 bg-red-400 px-4 rounded-md font-semibold  hover:opacity-85"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          className="py-2 bg-green-400 px-6 rounded-md font-semibold  hover:opacity-85"
          onClick={handleEditTask}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default MyPost;
