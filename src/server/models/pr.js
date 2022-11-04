const mongoose = require("mongoose");

const PrSechma = new mongoose.Schema(
  {
    action: String,
    html_url: String,
    state: String,
    title: String,
    created_at: Date,
    closed_at: Date,
    merged_at: Date,
    auto_merge: Boolean,
    _id: Number,
    changes_requested: Boolean,
    last_evidence: Date,
  },
  { _id: false }
);

const Pr = mongoose.model("Pr", PrSechma);

module.exports = Pr;
