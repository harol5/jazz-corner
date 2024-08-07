const whiteList = [
  "http://127.0.0.1:4500",
  "http://localhost:4500",
  "http://localhost:3000",
  "https://my-simple-notes-v1-2fcafdc02472.herokuapp.com",
  "https://jazzc.herokuapp.com:3000",
  "https://jazzc.herokuapp.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error("Hey!!, not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
