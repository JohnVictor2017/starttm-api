'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ValidationException extends LogicalException {

  handle(error, { response }) {

    response.status(400).send(error.message);
    
  }
}

module.exports = ValidationException
