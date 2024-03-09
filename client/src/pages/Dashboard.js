import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/dashboard/Navbar";
import { Link } from "react-router-dom";
import Communities from "./Communities";
import Dashboardcontent from "./Dashboard-content";

function Dashboard() {
  const [index, setIndex] = useState(0);

  const [userData, setUserData] = useState({
    username: "",
    fullname: "",
    posts: [],
  });

  const [error, setError] = useState(null);
  const components = [<Dashboardcontent data={userData} />, <Communities />];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/dashboard",
          { withCredentials: true }
        );
        const userData = response.data;
        // console.log("dari dsh", userData);
        setUserData(userData);
      } catch (error) {
        setError(error.response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-primary-dark min-h-screen">
      {error ? (
        <div className="text-2xl font-bold text-pink flex flex-col justify-center items-center h-[100vh]">
          {error}
          <Link className="font-light underline text-lg" to="/login">
            Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center p-4 bg-white-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 h-max ">
          <Navbar username={userData.username} fullname={userData.fullname} />
          <div className="flex gap-8 m-4">
            <div className="flex flex-col p-2 items-start gap-2 w-[15vw] h-max">
              <button
                autoFocus={true}
                className="text-start py-2 px-4 font-semibold text-lg text-purple w-full rounded-xl focus:bg-secondary-dark focus:text-pink focus:outline-none"
                onClick={() => setIndex(0)}
              >
                Dashboard
              </button>
              <button
                className=" text-start py-2 px-4 font-semibold text-lg text-purple w-full rounded-xl focus:bg-secondary-dark focus:text-pink focus:outline-none"
                onClick={() => setIndex(1)}
              >
                Communities
              </button>
            </div>
            <div className="w-full p-4">{components[index]}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
