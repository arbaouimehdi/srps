let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
const email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let StudentSchema = new mongoose.Schema({
  gender: {type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
  classe: {type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  full_name: { type: String, required: true },
  roll_id: { type: String, required: true },
  email: { 
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [email_regx, 'is invalid'],
    maxlength: 30,
    index: true
  },
  birth_date: { type: Date, required: true },
}, {timestamps: true});

StudentSchema.methods.toJSONFor = function(user) {
  return {
    gender: this.gender,
    classe: this.classe,
    full_name: this.full_name,
    roll_id: this.roll_id,
    email: this.email,
    birth_date: this.birth_date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Student', StudentSchema);