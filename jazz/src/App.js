import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Playlists from "./components/Playlists";
import Podcasts from "./components/Podcast";
import Places from "./components/Places";
import NotFound from "./components/notFound";
import Login from "./components/Login";
import PlaylistTracks from "./components/PlaylistTracks";
import axios from "axios";
import "./index.css";

const code = new URLSearchParams(window.location.search).get("code");

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:54065"
    : "https://jazzc.herokuapp.com";

function App() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (!code) return;
    axios
      .post(`${serverUrl}/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((error) => {
        console.log(error);
        // window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${serverUrl}/refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return code ? (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/places" element={<Places serverUrl={serverUrl} />} />
          <Route
            path="/podcasts"
            element={<Podcasts accessToken={accessToken} />}
          />
          <Route
            path="/playlists"
            element={<Playlists accessToken={accessToken} />}
          />
          <Route
            path="/playlists/:id"
            element={<PlaylistTracks accessToken={accessToken} />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/playlists" replace />} />
        </Routes>
      </main>
    </React.Fragment>
  ) : (
    <Login />
  );
}

export default App;
