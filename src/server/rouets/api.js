const express = require("express");
const Pr = require("../models/pr");
const screenshot = require("../screenshot/screenshot");
const SendMail = require("../mail/Mail");
const mail = new SendMail();

const router = express.Router();

const ActionChangePrData = ["opened", "reopened", "closed"];

router.post("/api", async (req, res) => {
  const { action } = req.body;
  console.log("action", action);
  // no pull_request return
  if (!req.body.pull_request) {
    throw new Error("No pull_request object");
  }

  // destruct data from req
  const {
    id: _id,
    html_url,
    state,
    title,
    created_at,
    closed_at,
    merged_at,
    auto_merge,
    user,
  } = req.body.pull_request;

  // if pr "opened", "reopened", "reopened"
  if (ActionChangePrData.includes(action)) {
    // query the pr
    const pr = await Pr.findById(_id);

    // save new pr - not exist
    if (!pr) {
      const newPr = new Pr({
        action,
        _id,
        html_url,
        state,
        title,
        created_at,
        closed_at,
        merged_at,
        auto_merge,
        last_evidence: new Date(),
      });
      // save in db
      await newPr.save();
      console.log("A new pr saved", newPr);
      // take screenshot
      await screenshot(html_url, _id);
      // send mail to CISO
      mail.sendMailToCISO(_id, title);
      return res.status(201).send(newPr);
    }

    pr.set({
      action,
      state,
      title,
      created_at,
      closed_at,
      merged_at,
      last_evidence: new Date(),
    });
    // save chenges
    await pr.save();
    console.log(`pr id number ${_id} has changed`, pr);
    // take screenshot
    await screenshot(html_url, _id);
    return res.status(201).send(pr);
  }

  // CODE REVIEW
  if (action === "submitted") {
    // query the pr
    const pr = await Pr.findById(_id);
    const { state } = req.body.review;

    // no pr
    if (!pr) {
      throw new Error(`No pr with id ${_id}`);
    }

    // take screenshot
    await screenshot(html_url, _id);
    pr.set({
      last_evidence: new Date(),
    });

    // code review aprroved
    if (state === "approved") {
      return res
        .status(200)
        .send("code review is approved and screenshot is taken");
    }
    // changes_requested is needed
    if (state === "changes_requested") {
      // send mail to the Pr owner
      mail.sendMailToPrOwner(_id, title, `${user.login}@auditech.com`);
      pr.set({
        changes_requested: true,
      });
    }
    await pr.save();
    return;
  }

  // PULL REQUEST SYNCHRONIZE
  if (action === "synchronize") {
    // get pr
    const pr = await Pr.findById(_id);
    if (!pr) {
      throw new Error(`No pr with id ${_id}`);
    }
    // if changes_requested under synchronize action takes screenshot and send mail
    if (pr.changes_requested === true) {
      mail.sendMailToCISO(_id, title);
      await screenshot(html_url, _id);
      return;
    }
  }
});

module.exports.apiRouter = router;
