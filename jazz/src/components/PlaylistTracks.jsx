import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "./common/Player";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const PlaylistTracks = () => {
  const [tracks, setTracks] = useState([]);
  const cleanTracks = tracks.filter((i) => i.track !== null);

  const { auth } = useAuth();
  const { id } = useParams();
  const url = `https://api.spotify.com/v1/playlists/${id}`;
  const config = {
    headers: {
      Authorization: "Bearer " + auth.code,
    },
  };
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setTracks(res.data.tracks.items);
      })
      .catch((err) => console.log(err));
  }, [auth.code]);

  return <Player items={cleanTracks} />;
};

export default PlaylistTracks;
