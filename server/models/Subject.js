let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
}, {timestamps: true});

SubjectSchema.methods.toJSONFor = function(user) {
  return {
    name: this.name,
    code: this.code,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Subject', SubjectSchema);