const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require("./db/connection");

// use routes
app.use(require("./routes/route"));

con
  .then((db) => {
    if (!db) return process.exit(1);

    //   listen to the http server
    app.listen(port, () => {
      console.log(`Money calculator is running server ${port}`);
    });
    app.on("error", (err) =>
      console.log(`failed to connect with http server ${err}`)
    );
  })
  .catch((err) => {
    console.log(`failed to connect mongodb ${err}`);
  });

// server run ...........

app.get("/", async (req, res) => {
  res.send("Money Calculator server is running on browser");
});
