import React from "react";
import "./login.scss";
import { GoogleLogin } from "@react-oauth/google";
import Account from "../../services/Account";
import { useDispatch } from "react-redux";
import { setAccount } from "../../store/actions/account";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from "react-facebook-login";
const { REACT_APP_FB_APP_ID } = process.env;
function Login(props) {
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
    if (response.status !== "unknown") {
      const accountData = {
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      };
      Account.setToken(response.accessToken, "facebook");
      Account.setAccount(response, "facebook");
      dispatch(setAccount(accountData));
    } else {
      console.error("Facebook login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="form signup">
          <div className="form-content">
            <header>Sign In</header>
          </div>
          <div className="media-options">
            <FacebookLogin
              appId={REACT_APP_FB_APP_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
              className="facebook-icon"
            />
          </div>
          <div className="line"></div>
          <div className="media-options">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  Account.setToken(credentialResponse.credential, "google");
                  Account.setAccount(
                    jwtDecode(credentialResponse.credential),
                    "facebook",
                  );
                  dispatch(
                    setAccount(jwtDecode(credentialResponse.credential)),
                  );
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
