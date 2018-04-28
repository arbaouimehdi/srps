let router = require('express').Router();

router.use('/', require('./users'));
router.use('/', require('./classes'));
router.use('/', require('./genders'));
router.use('/', require('./students'));
router.use('/', require('./subjects'));
router.use('/', require('./combinations'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;