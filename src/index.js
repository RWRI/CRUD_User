const express = require("express");
const json = require("./config/jsonMiddleware");
const router = require("./config/routes");
const PORT = 8080;

const app = express();

app.use(json);
app.use(router);
app.listen(PORT, () => console.log("Server is running on http://localhost:"+PORT));