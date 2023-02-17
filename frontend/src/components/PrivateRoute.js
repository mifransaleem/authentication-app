import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import moment from "moment";    
import { compare } from "../helpers/CompareTime";
function PrivateRoute({ children }) {
  //UseState
  const [isExpiredTime, setIsExpiredTime] = useState(false);
  //UseEffect
  useEffect(() => {
    checkExpiryTime();
  }, []);
  //Functions
  const checkExpiryTime = () => {
    if(localStorage.getItem("token")){
      setIsExpiredTime(false);
    }
     else {
      setIsExpiredTime(true);
    }
  };
  return !isExpiredTime ? children : <Navigate to="/account/login" />;
}

export default PrivateRoute;
