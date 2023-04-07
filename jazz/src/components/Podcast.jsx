import { React, useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./common/Pagination";

const Podcasts = ({ accessToken }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [endPoint, setEndPoint] = useState(
    "https://api.spotify.com/v1/search?q=jazz&type=show"
  );
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();

  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    axios
      .get(endPoint, config)
      .then((res) => {
        setPodcasts(res.data.shows.items);
        setNext(res.data.shows.next);
        setPrevious(res.data.shows.previous);
      })
      .catch((err) => console.log(err));
  }, [accessToken, endPoint]);

  return (
    <div>
      <Pagination previous={previous} next={next} setEndPoint={setEndPoint} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {podcasts.map((i) => (
          <div key={i.id} className="card p-4">
            <img src={i.images[1].url} className="img-fluid img-thumbnail" />
            <div className="card-body">
              <h5 className="card-title">{i.name}</h5>
              <time className="item-date small d-block text-muted mb-2">
                {i.publisher}
              </time>
              <p className="card-text">{i.description}</p>
              <a
                className="btn btn-secondary"
                href={i.external_urls.spotify}
                target="_blank"
              >
                Listen Podscasts
              </a>
            </div>
          </div>
        ))}
      </div>
      <Pagination previous={previous} next={next} setEndPoint={setEndPoint} />
    </div>
  );
};

export default Podcasts;
