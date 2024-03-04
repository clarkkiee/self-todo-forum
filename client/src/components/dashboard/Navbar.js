import React from "react";
import Avatar from "react-avatar";
import LogoutButton from "./LogoutButton";

function Navbar({ fullname, username }) {
  return (
    <div className="w-[100%] px-4 border-b-secondary-dark border-b-[1px] pb-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold text-pink">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Avatar
            name={username}
            size="40"
            color="#81689D"
            className="rounded-full"
          />
          <p className="text-xl text-purple">{username}</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
