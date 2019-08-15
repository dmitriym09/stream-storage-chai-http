'use strict';

const express = require('express');

const multer = require('multer');
const uploader = multer();

const app = express();

app.post('/', uploader.any(), (req, res) => {
    res.status(222).send(req.files[0].buffer.toString()).end();
});

app.use((err, req, res) => {
    res.status(444).send(err).end();
});

module.exports = app.listen();