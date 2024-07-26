import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserProtected({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("usertoken", user?.token);
  useEffect(() => {
    if (!user?.token) {
      navigate("/login", { replace: true });
    }
  }, [user?.token]);

  if (user?.token) {
    return children;
  } else {
    return null;
  }
}

export default UserProtected;
