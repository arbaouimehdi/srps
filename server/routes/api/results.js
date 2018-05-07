var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Result = mongoose.model('Result');
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
  console.log('++++++++++++++++++++++++++++++');
  console.log(results);
  console.log('++++++++++++++++++++++++++++++');

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
router.put('/result/:result', function(req, res, next) {
  let result_id = req.params.result;

  Result.findOne({ _id: result_id }, function (err, result) {
    if (err) return handleError(err);

    if (typeof req.body.student !== 'undefined') {
      result.student = req.body.student;
    }

    if (typeof req.body.classe !== 'undefined') {
      result.classe = req.body.classe;
    }
    
    if (typeof req.body.score !== 'undefined') {
      result.score = req.body.score;
    }

    result.save(function(err, result) {
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({result});
      }
    })

  });

})

// D
// Delete a Result
router.delete('/result/:result', function(req, res, next) {
  let result_id = req.params.result;
  if (result_id) {
    Result.remove({ _id: result_id}, (err, post) => {
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
// Get the Subjects Result of a Selected Class
router.get('/results/:student/:classe/subjects', function(req, res, next) {

  let student_id = req.params.student;
  let class_id = req.params.classe;

  Result.find({ classe: class_id, student: student_id }, function (err, result) {
    console.log(result);
    return res.send({result});
  });

})

module.exports = router;