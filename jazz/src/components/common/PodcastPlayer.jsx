import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";
import "../../Player.css";

const PodcastPlayer = ({ items, accessToken, uri }) => {
  const [trackSelected, setTrackSelected] = useState();
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackSelected]);

  return (
    <article className="player-grid">
      <div className="player">
        {items.map((i, index) => (
          <div
            key={i.id}
            className="track"
            onClick={() => setTrackSelected(i.uri)}
          >
            <img src={i.images[2].url} />
            <div>
              <h5>{i.name}</h5>
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
          uris={uri}
        />
      </div>
    </article>
  );
};

export default PodcastPlayer;
