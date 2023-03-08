import { React, useState, useEffect } from "react";
import Card from "./common/Card";
import axios from "axios";

const Playlists = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState([]);
  const [endPoint, setEndPoint] = useState(
    "https://api.spotify.com/v1/browse/categories/jazz/playlists"
  );
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const cleanPlaylist = playlists.filter((i) => i !== null);

  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
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
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
        {cleanPlaylist.map((i) => (
          <Card key={i.id} item={i} />
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" onClick={() => setEndPoint(previous)}>
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => setEndPoint(next)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Playlists;
