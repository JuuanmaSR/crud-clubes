/* eslint-disable no-unused-vars */
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const multer = require('multer');

const { ClubController, ClubService, ClubRepository } = require('../club/module');

function configureJSONDatabase() {
  return process.env.JSON_DB_PATH;
}

function configureUuidv4() {
  return uuidv4;
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.UPLOAD_FILE_PATH);
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const uploadConfigure = {
    storage,
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        return cb(null, true);
      }
      return cb('Error: Solo se soportan imagenes!');
    },
  };

  const upload = multer(uploadConfigure);
  return upload;
}

function configureSession() {
  const oneWeekInSeconds = 604800000;

  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneWeekInSeconds },
  };
  return session(sessionOptions);
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    fs,
    uuidv4: factory(configureUuidv4),
    Multer: factory(configureMulter),
    Sessions: factory(configureSession),
    JSONDatabase: factory(configureJSONDatabase),

  });
}

function addClubModulesDefinition(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('ClubService'), get('uuidv4')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('fs'), get('JSONDatabase')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addClubModulesDefinition(container);
  return container;
};
