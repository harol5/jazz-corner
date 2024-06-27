require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const yelp = require("yelp-fusion");
const path = require("path");

const PORT = process.env.PORT || 54065;

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "jazz/build")));

app.get("/refresh", (req, res) => {
  const refreshToken = req.cookies["spotify_refresh_tokens"];
  console.log("refresh token:", refreshToken);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.body["error_description"]);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  console.log("exchange code:", code);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.cookie("spotify_refresh_tokens", data.body.refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get("/places", (req, res) => {
  const client = yelp.client(process.env.API_KEY);
  client
    .search({
      term: "jazz",
      location: "NYC",
    })
    .then((response) => {
      res.json({
        businesses: response.jsonBody.businesses,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "jazz/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
