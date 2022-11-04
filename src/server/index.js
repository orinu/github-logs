const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const { apiRouter } = require("./rouets/api");
const { apiGetPrsRouter } = require("./rouets/get-prs");
const { apiGetPicRouter } = require("./rouets/get-pr-pic");

require("./db/mongoose");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRouter);
app.use(apiGetPrsRouter);
app.use(apiGetPicRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
