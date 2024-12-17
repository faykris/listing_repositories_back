require('dotenv').config();

const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({default: fetch}) => fetch(...args));
const bodyParser = require("body-parser");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function(req,res) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  const body = JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
  });

  await fetch("https://github.com/login/oauth/access_token", {  
    method: "POST",
    headers,
    body
  }).then((response) =>{
    return response.json();
  }).then((data) => {
    res.json(data);
  })
});

app.get("/getUserData", async function (req, res) {
  req.get("Authorization");

  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {"Authorization": req.get("Authorization")}
  }).then((response) => {
    return response.json();
  }).then((data) => {
    res.json(data)
  });
})

app.listen(PORT, function () {
  console.log("CORS server running on port " + PORT);
});
