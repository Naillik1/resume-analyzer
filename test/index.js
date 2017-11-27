const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Index server', () => {
  it('should have status code 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        (res.status).should.equal(200);
        done();
      });
  });
});
