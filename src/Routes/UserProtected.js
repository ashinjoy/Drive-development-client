import { useEffect } from "react";
import { LuReplace } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function UserProtected({ children }) {
  const user = useSelector((state) => state.user);
  const userData = user?.user;
  const location = useLocation();
  const navigate = useNavigate();
  console.log("usertoken", user?.token);
  console.log("user", user);
  useEffect(() => {
    if (!user?.token) {
      navigate("/login", { replace: true });
    } else if (userData.isBlocked) {
      navigate("/login", { replace: true });
    }
  }, []);

  if (user?.token) {
    return children;
  } else {
    return null;
  }
}

export default UserProtected;
