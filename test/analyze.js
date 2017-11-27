const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe(`WatsonNLU API`, () => {
  it('should return an error when no text is submitted', (done) => {
    const testData = {data: ''};
    chai.request(server)
      .post(`/api/analyze`)
      .send(testData)
      .end( (err, res) => {
        (res.status).should.eql(400);
        done();
      })
  })
});
