/* eslint-disable no-unused-vars */
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');

const jsonDataBasePath = process.env.JSON_DB_PATH;

const { ClubController, ClubService, ClubRepository } = require('../module');

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
    uuidv4,
    Sessions: factory(configureSession),
    JSONDatabase: jsonDataBasePath,

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
