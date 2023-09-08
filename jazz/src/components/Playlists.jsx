import { React, useState, useEffect } from "react";
import Card from "./common/Card";
import axios from "axios";
import Pagination from "./common/Pagination";

const Playlists = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState([]);
  const [endPoint, setEndPoint] = useState(
    "https://api.spotify.com/v1/browse/categories/jazz/playlists"
  );
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const cleanPlaylist = playlists.filter((i) => i !== null);

  useEffect(() => {
    if (!accessToken || !endPoint) return;
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    axios
      .get(endPoint, config)
      .then((res) => {
        setPlaylists(res.data.playlists.items);
        setNext(res.data.playlists.next);
        setPrevious(res.data.playlists.previous);
      })
      .catch((err) => console.log(err));
  }, [accessToken, endPoint]);

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
