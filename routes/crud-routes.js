/* eslint-disable eqeqeq */
const multer = require('multer');
const express = require('express');
const container = require('../modulos/club/configDI/container-di')();
/**
 * @type {import('../modulos/club/controllers/clubController')} clubController
 */
const clubController = container.get('ClubController');
const router = express.Router();
router.use(container.get('Sessions'));
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
router.get('/', clubController.clubIndex.bind(clubController));
// Agregar
router.get('/agregar', clubController.clubCreateGet.bind(clubController));
router.post('/agregar', upload.single('crestUrl'), clubController.clubCreatePost.bind(clubController));
// Ver un equipo
router.get('/ver/:id', clubController.clubDetails.bind(clubController));
// Elimiar un equipo
router.get('/eliminar/:id', clubController.clubDelete.bind(clubController));
// Editar un equipo
router.get('/editar/:id', clubController.clubUpdateGet.bind(clubController));
router.put('/editar/:id', upload.single('crestUrl'), clubController.clubUpdatePut.bind(clubController));

module.exports = router;
