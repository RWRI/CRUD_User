const express = require("express");
const {getUsers, postUser, putUser, deleteUser} = require("./app.js");
const router = express.Router();

router.get("/users", getUsers);
router.post("/users", postUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUser);

module.exports = router;