var router = require('express').Router();
var mongoose = require('mongoose');
var Classe = mongoose.model('Classe');
var User = mongoose.model('User');
var Combination = mongoose.model('Combination');
var auth = require('../auth');

// C
// Create a New Class
router.post('/classe', function(req, res, next) {

  var classe = new Classe(req.body.classe);
  classe.name_text = req.body.name_text;
  classe.name_numeric = req.body.name_numeric;
  classe.section = req.body.section;

  return classe.save(function(err, classe) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({classe});
    }
  });

});

// R
// Read All Classes
router.get('/classes', function(req, res, next) {

  Classe.find({}, function(err, classes){
    if (!err) {
      res.json({
        classes: classes
      })
    }
  });

})

// U
// Update the Countdown
router.put('/classe/:classe', function(req, res, next) {
  let classe_id = req.params.classe;

  Classe.findOne({ _id: classe_id }, function (err, classe) {
    if (err) return handleError(err);

    if (typeof req.body.name_text !== 'undefined') {
      classe.name_text = req.body.name_text;
    }

    if (typeof req.body.name_numeric !== 'undefined') {
      classe.name_numeric = req.body.name_numeric;
    }

    if (typeof req.body.section !== 'undefined') {
      classe.section = req.body.section;
    }

    classe.save(function(err, classe) {
      console.log(err);
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({classe});
      }
    })

  });

})


// D
// Delete a Class
router.delete('/classe/:classe', function(req, res, next) {
  let classe_id = req.params.classe;
  if (classe_id) {

    // Find if the selected Class is included in a combination(s)
    Combination.find({ classe: classe_id }, function (err, classe) {
      console.log(classe);

      if (classe.length > 0) {
        return res.status(422).json({errors: {classe: "you can't remove this classe, it has 'subjects'"}}); 
      }

      else {
        Classe.remove({ _id: classe_id}, (err, post) => {
          if (err) {
            return res.status(404).json(err); 
          }
          else {
            return res.sendStatus(204);
          }
        })
      }

    });

  }
});

// 
// Get Selected Class Details
router.get('/classe/:classe', function(req, res, next) {

  let classe_id = req.params.classe;

  Classe.findOne({ _id: classe_id }, function (err, classe) {
    return res.send({classe});
  });

})

module.exports = router;