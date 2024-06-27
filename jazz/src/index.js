import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/notFound";
import PersistLogin from "./utils/PersistLogin";
import RequireAuth from "./utils/RequireAuth";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";
import "bootstrap/dist/css//bootstrap.css";
import Playlists from "./components/Playlists";
import PlaylistTracks from "./components/PlaylistTracks";
import Podcasts from "./components/Podcast";
import Places from "./components/Places";
import Callback from "./utils/Callback";

const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/",
            element: <Playlists />,
          },
          {
            path: "/playlists",
            element: <Playlists />,
          },
          {
            path: "/playlists/:id",
            element: <PlaylistTracks />,
          },
          {
            path: "/podcasts",
            element: <Podcasts />,
          },
          {
            path: "/places",
            element: <Places />,
          },
        ],
      },
      {
        path: "/spotify-login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
