import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div key={item.id} className="card m-2">
      <h3 className="text-center mt-2">{item.name}</h3>
      <img src={item.images[0].url} className="img-fluid img-thumbnail" />
      <div className="card-body">
        <h6 className="text-muted">{item.owner.display_name}</h6>
        <p>{item.description}</p>
        <Link to={`/playlists/${item.id}`}>Play</Link>
      </div>
    </div>
  );
};

export default Card;
