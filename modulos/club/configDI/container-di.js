/* eslint-disable no-unused-vars */
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const jsonDataBasePath = process.env.JSON_DB_PATH;

const { ClubController, ClubService, ClubRepository } = require('../module');

function addCommonDefinitions(container) {
  container.addDefinitions({
    fs,
    uuidv4,
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
