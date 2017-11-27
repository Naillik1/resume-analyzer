const express = require('express');
const router = express.Router();
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
  username: process.env.BLUEMIX_NAME,
  password: process.env.BLUEMIX_PASS,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

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
  const request = {
    "text": data,
    "features": {
      "entities": {
        "limit": 10
      },
      "keywords": {
        "limit": 10,
        "sentiment": true
      }
    }
  }
  nlu.analyze(request, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.json(response);
    }
  });
});

module.exports = router;
