import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import "../../Player.css";

const Player = ({ items, accessToken }) => {
  const [trackSelected, setTrackSelected] = useState(0);
  const [play, setPlay] = useState(false);
  const uris = items.map((i) => i.track.uri);

  useEffect(() => setPlay(true), [trackSelected]);

  return (
    <article className="player-grid">
      <div className="player">
        {items.map((i, index) => (
          <Song
            key={i.track.id}
            item={i}
            index={index}
            setTrackSelected={setTrackSelected}
            trackSelected={trackSelected}
          />
        ))}
      </div>
      <div className="play-controller">
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={uris}
          offset={trackSelected}
          autoPlay={true}
        />
      </div>
    </article>
  );
};

function Song({ item, index, setTrackSelected, trackSelected }) {
  return (
    <div
      className={index === trackSelected ? "track-selected" : "track"}
      onClick={() => setTrackSelected(index)}
    >
      <img src={item.track.album.images[2].url} alt="" />
      <div>
        <h5>{item.track.name}</h5>
        <h6>{item.track.artists[0].name}</h6>
      </div>
    </div>
  );
}

export default Player;
