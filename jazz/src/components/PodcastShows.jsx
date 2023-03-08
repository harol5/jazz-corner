import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PodcastPlayer from "./common/PodcastPlayer";

const PodcastShows = ({ accessToken }) => {
  const [episodes, setEpisodes] = useState([]);
  const [uri, setUri] = useState(" ");
  const { id } = useParams();

  const url = `https://api.spotify.com/v1/shows/${id}`;
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setEpisodes(res.data.episodes.items);
        setUri(res.data.uri);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

  console.log(id);

  return <PodcastPlayer items={episodes} accessToken={accessToken} uri={uri} />;
};

export default PodcastShows;
