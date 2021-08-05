const AbstractErrorController = require('./error/abstractErrorController');

module.exports = class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new AbstractErrorController();
    }
  }
};
