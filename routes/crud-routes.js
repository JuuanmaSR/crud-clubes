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

// Home // ClubController //
router.get('/', clubController.clubIndex.bind(clubController));
router.get('/crear', clubController.clubCreateGet.bind(clubController));
router.get('/editar/:id', clubController.clubUpdateGet.bind(clubController));
router.post('/save', upload.single('crest_url'), clubController.clubSave.bind(clubController));
router.get('/ver/:id', clubController.clubDetails.bind(clubController));
router.get('/eliminar/:id', clubController.clubDelete.bind(clubController));

module.exports = router;
