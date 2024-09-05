import { useEffect } from "react";
import { LuReplace } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function UserProtected({ children }) {
  const {user,token} = useSelector((state) => state.user);
  const userData = user;
  const location = useLocation();
  const navigate = useNavigate();
  console.log("usertoken", token);
  console.log("user", user);
  useEffect(() => {
    if (!token) {
      console.log('tokrn changes');
      
      navigate("/login", { replace: true });
    } else if (userData.isBlocked) {
      navigate("/login", { replace: true });
    }
  }, []);

  if (token && user) {
    return children;
  } else {
    return null;
  }
}

export default UserProtected;
