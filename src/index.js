const express = require("express");
const router = require("./config/routes");
const PORT = 8080;

const app = express();

app.use(router);
app.listen(PORT, () => console.log("Server is running on http://localhost:"+PORT));