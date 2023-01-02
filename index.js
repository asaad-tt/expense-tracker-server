const express = require("express");

const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// using routes
app.use(require("./routes/route"));

// mongodb connection
const con = require("./db/connection.js");

con
  .then((db) => {
    if (!db) return process.exit(1);

    // listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server : ${err}`)
    );
    // error in mondb connection
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
  });

// server run ...........

app.get("/", async (req, res) => {
  res.send("Money Calculator server is running on browser");
});
