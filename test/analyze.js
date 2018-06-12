const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

const CHAR_MAX = 3001;
const TEST_TEXT = fs.readFileSync('./test/testText.txt', 'utf8')

describe(`Analyze API`, () => {
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
  it('should return an error when text is too long', (done) => {
    const testData = {data: 'x'.repeat(CHAR_MAX)};
    chai.request(server)
      .post(`/api/analyze`)
      .send(testData)
      .end( (err, res) => {
        (res.status).should.eql(400);
        done();
      })
  })
  it('should return success when text is within length limits', (done) => {
    const testData = {data: TEST_TEXT};
    chai.request(server)
      .post(`/api/analyze`)
      .send(testData)
      .end( (err, res) => {
        (res.status).should.eql(200);
        done();
      })
  }).timeout(0);
});
