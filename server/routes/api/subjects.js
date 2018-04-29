var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var auth = require('../auth');

// C
// Create a New Subject
router.post('/subject', function(req, res, next) {
  
  var subject = new Subject(req.body.subject);

  subject.name = req.body.name;
  subject.code = req.body.code;

  return subject.save(function(err, subject) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({subject});
    }
  });

});

// R
// Read All Subjects
router.get('/subjects', function(req, res, next) {

  Subject.find({}, function(err, subjects){
    if (!err) {
      res.json({subjects})
    }
  });

})

// U
// Update the Subject
router.put('/subject/:subject', function(req, res, next) {
  let subject_id = req.params.subject;

  Subject.findOne({ _id: subject_id }, function (err, subject) {
    if (err) return handleError(err);

    if (typeof req.body.name !== 'undefined') {
      subject.name = req.body.name;
    }

    if (typeof req.body.code !== 'undefined') {
      subject.code = req.body.code;
    }

    subject.save(function(err, subject) {
      console.log(err);
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({subject});
      }
    })

  });

})


// D
// Delete a Subject
router.delete('/subject/:subject', function(req, res, next) {
  let subject_id = req.params.subject;
  if (subject_id) {
    Subject.remove({ _id: subject_id}, (err, post) => {
      if (err) {
        return res.status(404).json(err); 
      }
      else {
        return res.sendStatus(204);
      }
    })
  }
});

// 
// Get Selected Subject Details
router.get('/subject/:subject', function(req, res, next) {

  let subject_id = req.params.subject;

  Subject.findOne({ _id: subject_id }, function (err, subject) {
    return res.send({subject});
  });

})

module.exports = router;