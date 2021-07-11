"use strict"
const express= require("express");
const router = new express.Router();

const Paragraph = require('../models/paragraph')
const auth = require("../middleware/authentication");
const messagejs = require("../message/message.js");
const utiljs = require("../utils/user-utils");

router.post('/paragraphs/addNew',auth,async (req, res) => {

    try {
        await Paragraph.createAParagraph(req.body,req.user);
        messagejs.sendSuccess(res, "NEW_PARAGRAPH_CREATED")
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.get('/paragraphs/:id',auth,async (req, res) => {

    try {
        let paragraph = await Paragraph.getAParagraph(req.params.id);
        paragraph = utiljs.objectFormat(paragraph,["title","content","comments","userEmail"]);
        res.status(200).send(paragraph);
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

module.exports = router