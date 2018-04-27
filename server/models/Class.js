let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let ClassSchema = new mongoose.Schema({
  name_text: { type: String, required: true },
  name_numeric: { type: Number, required: true },
  section: { type: String, required: true }
}, {timestamps: true});

ClassSchema.methods.toJSONFor = function(user) {
  return {
    name_text: this.name_text,
    name_numeric: this.name_numeric,
    section: this.section,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Class', ClassSchema);