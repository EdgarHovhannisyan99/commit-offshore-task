import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Account from "../services/Account";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { setAccount } from "../store/actions/account";
import Header from "./header/Header";

function Wrapper(props) {
  const account = useSelector((state) => state.account?.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Account.getToken();
    const storageAccount = Account.getAccount();
    if (token) {
      if (isEmpty(account)) {
        dispatch(setAccount(storageAccount));
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Wrapper;
