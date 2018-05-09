var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Result = mongoose.model('Result');
var Student = mongoose.model('Student');
var auth = require('../auth');

// C
// Create a New Result
router.post('/result', function(req, res, next) {

  let results = []

  for (let i = 0; i < req.body.length; i += 1) {
    results[i] = new Result(req.body[i].result)

    results[i].student = req.body[i].student;
    results[i].classe  = req.body[i].classe;
    results[i].subject = req.body[i].subject;
    results[i].score   = req.body[i].score;

  }

  Result.insertMany(results, function(error, docs) {
    if (error) {
      console.log(error);
      return res.status(404).json(error); 
    }
    else {
      return res.json({docs});
    }
  })

});

// R
// Read All Results
router.get('/results', function(req, res, next) {

  Result.find({}, function(err, results){
    if (!err) {
      res.json({results})
    }
  });

})

// U
// Update the Result
router.put('/result/:student/:classe/', function(req, res, next) {
  
  // Result.find({ classe: class_id, student: student_id }, function (err, results) {
    
  //   console.log(results);

  //   for (let i = 0; i < req.body.length; i += 1) {

  //     // Result.updateOne({
  //     //   '_id': req.body[i]._id,
  //     //   'student': req.body[i].student,
  //     //   'classe': req.body[i].classe,
  //     //   'subject': req.body[i].subject,
  //     //   'score': req.body[i].score,
  //     // })

  //   }

  // });

})

// D
// Delete a Result
router.delete('/result/:student/:classe', function(req, res, next) {

  let student_id = req.params.student;
  let classe_id = req.params.classe;

  if (student_id && classe_id) {
    Result.remove({
      student: student_id, 
      classe: classe_id, 
    }, (err, post) => {
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
// Get Selected Result Details
router.get('/result/:result', function(req, res, next) {

  let result_id = req.params.result;

  Result.findOne({ _id: result_id }, function (err, result) {
    return res.send({result});
  });

})

// 
// Get the Subjects Result of a Selected Class using student_id
router.get('/results/:student/:classe/subjects', function(req, res, next) {

  let student_id = req.params.student;
  let class_id = req.params.classe;

  Result.find({ classe: class_id, student: student_id }, function (err, result) {
    console.log(result);
    return res.send({result});
  });

})

// 
// Get the Subjects Result of a Selected Class using roll_id
router.get('/results/:roll_id/:classe/all', function(req, res, next) {

  let roll_id = req.params.roll_id;
  let class_id = req.params.classe;
  let student_id = '';

  Student.findOne({roll_id: roll_id}, function(err, result, next) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {

      student_id = result._id

      Result.find({ student: student_id , classe: class_id}, function (err, result) {

        if (err) {
          return res.status(404).json(err); 
        }
    
        else {
          return res.send({result});
        }
      });

    }
  })

})

module.exports = router;