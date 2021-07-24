/* eslint-disable eqeqeq */
const express = require('express');
const container = require('../modulos/configDI/container-di')();
/**
 * @type {import('../modulos/club/controllers/clubController')} clubController
 */
const clubController = container.get('ClubController');
const upload = container.get('Multer');
const router = express.Router();

router.use(container.get('Sessions'));

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
