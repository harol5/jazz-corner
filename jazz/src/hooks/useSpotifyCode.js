import { useEffect } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const code = new URLSearchParams(window.location.search).get("code");
const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:54065"
    : "https://jazzc.herokuapp.com";

const useSpotifyCode = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    console.log("useEffect exchange code with token ran!");
    if (!code) return;
    axios
      .post(
        `${serverUrl}/login`,
        {
          code,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        setAuth((prev) => {
          return {
            ...prev,
            code: res.data.accessToken,
            expiresIn: res.data.expiresIn,
          };
        });
        window.history.pushState({}, null, "/");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        window.location = "/";
      });
  }, []);
};

export default useSpotifyCode;
