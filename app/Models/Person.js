const BaseModel = use('MongooseModel');
const { Schema } = use('mongoose');
const { Address } = use('App/Models/Schemes');

class Person extends BaseModel {
  static boot() {}

  static get schema() {
    return {
      user: {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      sex: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        required: true,
      },
      birth: {
        type: Date,
        required: true,
      },
      cpf: {
        type: String,
        unique: true,
        required: true,
      },
      rg: {
        type: String,
        unique: true,
        required: true,
      },
      address: {
        type: Address,
        required: true,
      },
    };
  }
}

module.exports = Person.buildModel('Person');
