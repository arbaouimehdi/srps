var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Combination = mongoose.model('Combination');
var auth = require('../auth');

// C
// Create a New Combination
router.post('/combination', function(req, res, next) {
  
  var combination = new Combination(req.body.combination);

  combination.subject = req.body.subject;
  combination.classe   = req.body.classe;
  combination.status  = req.body.status;

  return combination.save(function(err, combination) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({combination});
    }
  });

});

// R
// Read All Combinations
router.get('/combinations', function(req, res, next) {

  Combination.find({}, function(err, combinations){
    if (!err) {
      res.json({combinations})
    }
  });

})

// U
// Update the Combination
router.put('/combination/:combination', function(req, res, next) {
  let combination_id = req.params.combination;
  
  Combination.findOne({ _id: combination_id }, function (err, combination) {
    if (err) return handleError(err);

    if (typeof req.body.subject !== 'undefined') {
      combination.subject = req.body.subject;
    }

    if (typeof req.body.classe !== 'undefined') {
      combination.classe = req.body.classe;
    }
    
    if (typeof req.body.status !== 'undefined') {
      combination.status = req.body.status;
    }

    combination.save(function(err, combination) {
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({combination});
      }
    })

  });

})

// D
// Delete a Combination
router.delete('/combination/:combination', function(req, res, next) {
  let combination_id = req.params.combination;
  if (combination_id) {
    Combination.remove({ _id: combination_id}, (err, post) => {
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
// Get Selected Combination Details
router.get('/combination/:combination', function(req, res, next) {

  let combination_id = req.params.combination;

  Combination.findOne({ _id: combination_id }, function (err, combination) {
    return res.send({combination});
  });

})

// 
// Get Combination Subjects
router.get('/combination/classe/:classe', function(req, res, next) {

  let class_id = req.params.classe;

  Combination.find({ classe: class_id })
    .populate('subject')
    .exec(function(err, combination) {
      return res.send({combination});
    });

})

module.exports = router;