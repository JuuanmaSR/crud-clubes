/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');

const session = require('express-session');
const multer = require('multer');
const Sqlite3Database = require('better-sqlite3');

const { ClubController, ClubService, ClubRepository } = require('../club/module');

function configureMainDatabaseAdapter() {
  return new Sqlite3Database(process.env.SQLITE_DB_PATH, {
    verbose: console.log,
  });
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
    Multer: factory(configureMulter),
    Sessions: factory(configureSession),
    MainDatabase: factory(configureMainDatabaseAdapter),

  });
}

function addClubModulesDefinition(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('ClubService')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('MainDatabase')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addClubModulesDefinition(container);
  return container;
};
