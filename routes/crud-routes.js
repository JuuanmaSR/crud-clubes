/* eslint-disable eqeqeq */
const multer = require('multer');
const express = require('express');
const clubController = require('../controllers/clubController');

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

// Home
router.get('/', clubController.clubIndex);
// Agregar
router.get('/agregar', clubController.clubCreateGet);
router.post('/agregar', upload.single('imagen'), clubController.clubCreatePost);
// Ver un equipo
router.get('/ver/:id', clubController.clubDetails);
// Elimiar un equipo
router.get('/eliminar/:id', clubController.clubDelete);
// Editar un equipo
router.get('/editar/:id', clubController.clubUpdateGet);
router.put('/editar/:id', upload.single('imagen'), clubController.clubUpdatePut);

module.exports = router;
