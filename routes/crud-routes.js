/* eslint-disable eqeqeq */
const multer = require('multer');
const express = require('express');

const router = express.Router();
// Storage Settings
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/images');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      return cb(null, true);
    }
    return cb('Error: Solo se soportan imagenes!');
  },
});


module.exports = router;
