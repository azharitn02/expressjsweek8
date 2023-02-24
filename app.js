const express = require("express");
const app = express();
const port = 3000;
const router = require("./query.js");

app.use(router);

// app.get("/", (req, res) => {
//   res.send("hello bang");
// });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
