'use strict'

const BaseModel = use('MongooseModel');
const { Schema } = use('Mongoose');

const validator = use('App/Validators/User');

class User extends BaseModel {
  static boot({ schema }) {
    this.addHook('preSave', 'UserHook.hashPassword');
  }



  static get schema() {
    return {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
          isAsync: true,
          validator: validator.validateEmail,
          message: 'Is not a valid email',
        }
      },
      username: {
        type: String,
        required: true,
        unique: true,
        validate: {
          isAsync: true,
          validator: validator.validateUsername,
          message: 'Its not a valid username',
        }
      },
      password: {
        type: String,
        required: true,
      },
      roles: [{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Role'
      }]
    }
  }

}

module.exports = User.buildModel('User')