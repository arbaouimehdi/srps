let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let ResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classe',
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true 
  },
  score: { 
    type: Number,
    required: true 
  },
}, {timestamps: true});

ResultSchema.index({ student: 1, classe: 1 }, { unique: true });

ResultSchema.plugin(uniqueValidator);

ResultSchema.methods.toJSONFor = function() {
  return {
    student: this.student,
    classe: this.classe,
    subject: this.subject,
    score: this.score,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Result', ResultSchema);