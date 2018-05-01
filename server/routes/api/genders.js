var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Gender = mongoose.model('Gender');
var auth = require('../auth');

// C
// Create a New Class
router.post('/gender', function(req, res, next) {
  
  var gender = new Gender(req.body.gender);
  gender.type = req.body.type;

  return gender.save(function(err, gender) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({gender});
    }
  });

});

// R
// Read All Classes
router.get('/genders', function(req, res, next) {

  Gender.find({}, function(err, genders){
    if (!err) {
      res.json({genders})
    }
  });

})

// U
// Update the Countdown
router.put('/gender/:gender', function(req, res, next) {
  let gender_id = req.params.gender;

  Gender.findOne({ _id: gender_id }, function (err, gender) {
    if (err) return handleError(err);

    if (typeof req.body.type !== 'undefined') {
      gender.type = req.body.type;
    }

    gender.save(function(err, gender) {
      console.log(err);
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({gender});
      }
    })

  });

})


// D
// Delete a Class
router.delete('/gender/:gender', function(req, res, next) {
  let gender_id = req.params.gender;
  console.log(gender_id);
  if (gender_id) {
    Gender.remove({ _id: gender_id}, (err, post) => {
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
// Get Selected Gender Details
router.get('/gender/:gender', function(req, res, next) {

  let gender_id = req.params.gender;

  Gender.findOne({ _id: gender_id }, function (err, gender) {
    return res.send({gender});
  });

})

module.exports = router;