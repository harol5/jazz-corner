import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const code = new URLSearchParams(window.location.search).get("code");
const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:54065"
    : "https://jazzc.herokuapp.com";

const Callback = () => {
  console.log("callback component called!!");
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { setAuth } = useAuth();

  useEffect(() => {
    console.log("useEffect exchange code with token ran!", code);
    if (!code) {
      setIsLoading(false);
      return;
    }
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
        console.log("response from login exchange code:", res);
        setAuth((prev) => {
          return {
            ...prev,
            code: res.data.accessToken,
            expiresIn: res.data.expiresIn,
          };
        });
        setIsLoading(false);
        //    window.history.pushState({}, null, "/");
      })
      .catch((error) => {
        console.log(error);
        window.location = "/";
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default Callback;
