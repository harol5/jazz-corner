import { React } from "react";
import image from "../logo.png";
import "../Login.css";

const redirectUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://jazzc.herokuapp.com";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=bf8659c4a5d04113a8032aef9845bbde&response_type=code&redirect_uri=${redirectUrl}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <img src={image} alt="" className="logo" />
      </div>
      <a className="btn btn-dark" href={AUTH_URL}>
        Login using Spotify Account
      </a>
    </div>
  );
};

export default Login;
