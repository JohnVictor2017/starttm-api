const BaseModel = use('MongooseModel');
const { Schema } = use('Mongoose');

class Arbiter extends BaseModel {
  static boot() {
    this.index({ user: 1 }, { background: true });
  }

  static get schema() {
    return {
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User',
      },
      participations: {
        type: Number,
        min: 0,
      },
    };
  }
}

module.exports = Arbiter.buildModel('Arbiter');
