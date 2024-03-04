import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 mx-6 font-semibold bg-secondary-dark text-pink rounded-sm hover:opacity-80"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default LogoutButton;
