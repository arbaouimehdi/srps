let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let CombinationSchema = new mongoose.Schema({
  subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  classe: {type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  status: { type: Boolean, required: true },
}, {timestamps: true});

CombinationSchema.methods.toJSONFor = function(user) {
  return {
    subject: this.subject,
    class: this.class,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Combination', CombinationSchema);