import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh] gap-2 bg-primary-dark text-pink">
        <h1 className="text-3xl font-bold">RPLorer</h1>
        <p>Tugas 2 RPL 2023/2024</p>
        <div className="flex gap-4 mt-2">
          <Link
            className="p-2 bg-emerald-500 rounded-md px-4 font-semibold"
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className="p-2 bg-rose-500 rounded-md px-4 font-semibold"
            to={"/register"}
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
