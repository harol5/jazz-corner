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
          <div
            key={i.track.id}
            className="track"
            onClick={() => setTrackSelected(index)}
          >
            <img src={i.track.album.images[2].url} />
            <div>
              <h5>{i.track.name}</h5>
              <h6>{i.track.artists[0].name}</h6>
            </div>
          </div>
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

export default Player;
