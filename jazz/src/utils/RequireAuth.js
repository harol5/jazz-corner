import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "../api/axios";

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:54065"
    : "https://jazzc.herokuapp.com";

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const { code, expiresIn } = auth;

  useEffect(() => {
    console.log("RequireAuth useEffect ran!!");
    if (!code || !expiresIn) return;

    console.log("RequireAuth useEffect setInterval ran succefully!!");
    const interval = setInterval(() => {
      axios
        .get(`${serverUrl}/refresh`, {
          withCredentials: true,
        })
        .then((res) => {
          setAuth((prev) => {
            return {
              ...prev,
              code: res.data.accessToken,
              expiresIn: res.data.expiresIn,
            };
          });
        })
        .catch((err) => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => {
      console.log(
        "require auth cleanup useEffect setInterval ran succefully!!"
      );
      clearInterval(interval);
    };
  }, [code, expiresIn]);

  return code ? (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to="/spotify-login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
