import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "./common/Player";
import axios from "axios";

const PlaylistTracks = ({ accessToken }) => {
  const [tracks, setTracks] = useState([]);
  const cleanTracks = tracks.filter((i) => i.track !== null);

  const { id } = useParams();
  const url = `https://api.spotify.com/v1/playlists/${id}`;
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setTracks(res.data.tracks.items);
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

  return <Player items={cleanTracks} accessToken={accessToken} />;
};

export default PlaylistTracks;
