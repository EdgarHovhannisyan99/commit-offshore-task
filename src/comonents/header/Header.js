import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { googleLogout } from "@react-oauth/google";
import "./header.scss";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logOut } from "../../store/actions/account";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";

function Header(props) {
  const account = useSelector((state) => state.account?.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    googleLogout();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="favorites-link">
        <p onClick={() => navigate("/")} className="link">
          Home <IoMdHome />
        </p>
        <p onClick={() => navigate("/favorites")} className="link">
          Favorites <FaHeart />
        </p>
      </div>
      <div className="header-account">
        {!isEmpty(account) && account.name && (
          <div className="header__account">
            <h3>{account.name}</h3>
          </div>
        )}
        <RiLogoutBoxRLine size="30" cursor={"pointer"} onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Header;
