/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');

const { Sequelize } = require('sequelize');
const session = require('express-session');
const multer = require('multer');

const {
  ClubController, ClubService, ClubRepository, EquipoModel,
} = require('../club/module');

function configureSequelizeMainDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_DB_PATH,
  });
  sequelize.sync();
  return sequelize;
}

function configureEquipoModel(container) {
  EquipoModel.setup(container.get('Sequelize'));
  return EquipoModel;
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
    Sequelize: factory(configureSequelizeMainDatabase),
    Multer: factory(configureMulter),
    Sessions: factory(configureSession),
  });
}

function addClubModulesDefinition(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('ClubService')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('EquipoModel')),
    EquipoModel: factory(configureEquipoModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addClubModulesDefinition(container);
  return container;
};
