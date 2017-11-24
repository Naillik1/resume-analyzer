const express = require('express');
const router = express.Router();
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
  username: process.env.BLUEMIX_NAME,
  password: process.env.BLUEMIX_PASS,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

router.route('/analyze')

.post((req, res) => {
  const data = req.body.data;
  const request = {
    "text": data,
    "features": {
      "entities": {
        "emotion": true,
        "sentiment": true,
        "limit": 2
      },
      "keywords": {
        "emotion": true,
        "sentiment": true,
        "limit": 2
      }
    }
  }
  console.log(data);
  nlu.analyze(request, (err, response) => {
    if (err) {
      console.log(`error: ${err}`);
    } else {
      console.log(JSON.stringify(response, null, 2));
      res.json(response);
    }
  });
});

module.exports = router;
