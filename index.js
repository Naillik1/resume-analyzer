require('dotenv').config();
const express = require('express');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const app = express();

const nlu = new NaturalLanguageUnderstandingV1({
  username: process.env.BLUEMIX_NAME,
  password: process.env.BLUEMIX_PASS,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

app.get('/', (req, res) => {
  const file_data = "words words words words HEY words NO NO NO YESYES YES YES";
  const request = {
    "text": "IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.",
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
  nlu.analyze(request, (err, response) => {
    if (err) {
      console.log(`error: ${err}`);
    } else {
      res.json(response);
    }
  });

});



const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on port ${port}`);
