const express = require("express");
const Pr = require("../models/pr");

const router = express.Router();

router.get("/api", async (req, res) => {
  const prs = await Pr.find({});
  res.status(200).send(prs);
});

module.exports.apiGetPrsRouter = router;
