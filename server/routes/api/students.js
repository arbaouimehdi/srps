var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Student = mongoose.model('Student');
var auth = require('../auth');

// C
// Create a New Student
router.post('/student', function(req, res, next) {
  
  var student = new Student(req.body.student);

  student.gender     = req.body.gender;
  student.class      = req.body.class;
  student.full_name  = req.body.full_name;
  student.roll_id    = req.body.roll_id;
  student.email      = req.body.email;
  student.birth_date = req.body.birth_date;

  return student.save(function(err, student) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({student});
    }
  });

});

// R
// Read All Students
router.get('/students', function(req, res, next) {

  Student.find({}, function(err, students){
    if (!err) {
      res.json({students})
    }
  });

})

// U
// Update the Countdown
router.put('/student/:student', function(req, res, next) {
  let student_id = req.params.student;
  
  Student.findOne({ _id: student_id }, function (err, student) {
    if (err) return handleError(err);

    if (typeof req.body.gender !== 'undefined') {
      student.gender = req.body.gender;
    }

    if (typeof req.body.class !== 'undefined') {
      student.class = req.body.class;
    }

    if (typeof req.body.full_name !== 'undefined') {
      student.full_name = req.body.full_name;
    }

    if (typeof req.body.roll_id !== 'undefined') {
      student.roll_id = req.body.roll_id;
    }

    if (typeof req.body.email !== 'undefined') {
      student.email = req.body.email;
    }

    if (typeof req.body.birth_date !== 'undefined') {
      student.birth_date = req.body.birth_date;
    }

    student.save(function(err, student) {
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({student});
      }
    })

  });

})

// D
// Delete a Student
router.delete('/student/:student', function(req, res, next) {
  let student_id = req.params.student;
  if (student_id) {
    Student.remove({ _id: student_id}, (err, post) => {
      if (err) {
        return res.status(404).json(err); 
      }
      else {
        return res.sendStatus(204);
      }
    })
  }
});

module.exports = router;