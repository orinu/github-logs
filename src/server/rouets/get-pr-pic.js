const express = require("express");
const router = express.Router();
const path = require("path");

const Pr = require("../models/pr");

router.get("/api/pic/:prId", async (req, res) => {
  const id = req.params.prId;
  const pr = await Pr.findById(id);

  if (!pr) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.resolve(__dirname, `../screenshot/images/${id}.png`));
});

module.exports.apiGetPicRouter = router;
