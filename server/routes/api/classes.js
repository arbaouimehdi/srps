var router = require('express').Router();
var mongoose = require('mongoose');
var Claass = mongoose.model('Class');
var User = mongoose.model('User');
var auth = require('../auth');

// C
// Create a New Class
router.post('/claass', function(req, res, next) {
  
  var claass = new Claass(req.body.claass);
  claass.name_text = req.body.name_text;
  claass.name_numeric = req.body.name_numeric;
  claass.section = req.body.section;

  return claass.save(function(err, claass) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({claass});
    }
  });

});

// R
// Read All Classes
router.get('/classes', function(req, res, next) {

  Claass.find({}, function(err, classes){
    if (!err) {
      res.json({
        classes: classes
      })
    }
  });

})

// U
// Update the Countdown
router.put('/claass/:claass', function(req, res, next) {
  let claass_id = req.params.claass;

  Claass.findOne({ _id: claass_id }, function (err, claass) {
    if (err) return handleError(err);

    if (req.body.name_text !== 'undefined') {
      claass.name_text = req.body.name_text;
    }

    if (req.body.name_numeric !== 'undefined') {
      claass.name_numeric = req.body.name_numeric;
    }

    if (req.body.section !== 'undefined') {
      claass.section = req.body.section;
    }

    claass.save(function(err, claass) {
      console.log(err);
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({claass});
      }
    })

  });

})


// D
// Delete a Class
router.delete('/claass/:claass', function(req, res, next) {
  let claass_id = req.params.claass;
  console.log(claass_id);
  if (claass_id) {
    Claass.remove({ _id: claass_id}, (err, post) => {
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