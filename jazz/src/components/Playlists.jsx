import { React, useState, useEffect } from "react";
import Card from "./common/Card";
import axios from "axios";
import Pagination from "./common/Pagination";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const Playlists = () => {
  console.log("playlist component ran!!");

  const { auth } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [endPoint, setEndPoint] = useState(
    "https://api.spotify.com/v1/browse/categories/jazz/playlists"
  );
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const cleanPlaylist = playlists.filter((i) => i !== null);

  useEffect(() => {
    console.log("useEffect playlist ran!");
    if (!auth.code || !endPoint) return;
    const config = {
      headers: {
        Authorization: "Bearer " + auth.code,
      },
    };

    axios
      .get(endPoint, config)
      .then((res) => {
        setPlaylists(res.data.playlists.items);
        setNext(res.data.playlists.next);
        setPrevious(res.data.playlists.previous);
        console.log(res.data.playlists);
      })
      .catch((err) => console.log(err));

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [auth.code, endPoint]);

  return (
    <div>
      <h1>Playlists</h1>
      <Pagination previous={previous} next={next} setEndPoint={setEndPoint} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
        {cleanPlaylist.map((i) => (
          <Card key={i.id} item={i} />
        ))}
      </div>
      <Pagination previous={previous} next={next} setEndPoint={setEndPoint} />
    </div>
  );
};

export default Playlists;
