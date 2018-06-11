const express = require('express');
const router = express.Router();
const python = require('python-shell');

const MAX_LENGTH = 3000;

function validateRequest(data) {
  let isValid = true;
  let errors = {};
  if (!data) isValid = false;

  if (typeof data !== 'string' || data.length < 1) {
    isValid = false;
    errors.reason = 'Please enter some text';
  } else if (data.length > MAX_LENGTH) {
    isValid = false;
    errors.reason = `Keep text under ${MAX_LENGTH} characters`;
  }
  return {
    success: isValid,
    errors 
  }
}

router.route('/analyze')
.post((req, res) => {
  const data = req.body.data;
  const validationResult = validateRequest(data);
  if (!validationResult.success) {
    return res.status(400).json({
      errors: validationResult.errors
    });
  }
  let options = {
    args: [data]
  }
  
  python.run('summarize.py', options=options, (err, results) => { 
    if (err) console.log(err);
    res.send(JSON.stringify(JSON.parse(results[0])));
  });
});

module.exports = router;
