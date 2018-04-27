let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let GenderSchema = new mongoose.Schema({
  type: { type: String, required: true },
}, {timestamps: true});

GenderSchema.methods.toJSONFor = function(user) {
  return {
    type: this.name_text,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Gender', GenderSchema);