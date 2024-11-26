import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Account from "../services/Account";
import { useSelector } from "react-redux";

function WrapperLogOut(props) {
  const account = useSelector((state) => state.account?.account);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Account.getToken();
    if (token) {
      navigate("/characters", { replace: true });
    } else {
      window.history.pushState("/login", "", "/login");
    }
  }, [account, navigate]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default WrapperLogOut;
