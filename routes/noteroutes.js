const express = require('express');
const { getnotes, createnotes, deletenotes, updatenotes } = require('../controller/notestcontroller');
const { auth } = require('../middleware/auth');
const noterouter = express.Router();

noterouter.post("/", auth, createnotes);

noterouter.get("/", auth,  getnotes);


noterouter.delete("/:id", auth, deletenotes);
noterouter.put("/:id", auth, updatenotes);

module.exports = noterouter;