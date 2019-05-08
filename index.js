const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const root = path.resolve(__dirname, "src");

app.use(express.static(root));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// load api routes
require("./api")(app, root);

// start server lisening on user provided port (default: 3000)
app.listen(port, () => {
    console.log(`node-impact listening on port ${port}`);
});
