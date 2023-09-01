import React, { useEffect, useState } from "react";
import axios from "axios";

const Places = ({ serverUrl }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/places`)
      .then((res) => {
        setPlaces(res.data.businesses);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Places</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {places.map((i) => (
          <div key={i.id} className="card p-4">
            <img
              src={i.image_url}
              className="img-fluid img-thumbnail mx-auto d-block"
              style={{ objectFit: "cover", width: 300, height: 300 }}
            />
            <div className="card-body">
              <h6 className="text-muted">{i.name}</h6>
              <p>
                {i.location.display_address[0] +
                  ", " +
                  i.location.display_address[1]}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price: {i.price}</li>
              <li className="list-group-item">Rating: {i.rating}</li>
              <li className="list-group-item">Reviews: {i.review_count}</li>
              <li className="list-group-item">
                <a href={i.url} target="_blank">
                  Yelp!
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
