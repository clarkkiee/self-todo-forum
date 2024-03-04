import React from "react";

function Dashboardcontent({ fullname }) {
  return (
    <>
      <div className="">
        <h1 className="text-lg text-pink">Welcome, {fullname}</h1>
      </div>
    </>
  );
}

export default Dashboardcontent;
