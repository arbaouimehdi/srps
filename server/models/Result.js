let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let ResultSchema = new mongoose.Schema({
  student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  combination: {type: mongoose.Schema.Types.ObjectId, ref: 'Combination', required: true },
  score: { type: Number, required: true },
}, {timestamps: true});

ResultSchema.methods.toJSONFor = function(user) {
  return {
    student: this.student,
    combination: this.combination,
    score: this.score,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Result', ResultSchema);