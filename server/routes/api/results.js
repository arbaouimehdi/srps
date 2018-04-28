var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Result = mongoose.model('Result');
var auth = require('../auth');

// C
// Create a New Result
router.post('/result', function(req, res, next) {
  
  var result = new Result(req.body.result);

  result.student     = req.body.student;
  result.combination = req.body.combination;
  result.score       = req.body.score;

  return result.save(function(err, student) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({result});
    }
  });

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

    if (typeof req.body.combination !== 'undefined') {
      result.combination = req.body.combination;
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

module.exports = router;