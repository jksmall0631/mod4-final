const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');

chai.use(chaiHttp);

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  });
});

describe('GET /', function() {
  it('should return a 200 and html', function(done) {
    chai.request(app)
    .get('/')
    .end(function(err, res) {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
  });
});

describe('GET /api/v1/items', function() {

  it('should return all items', function(done) {
      chai.request(app)
      .get('/api/v1/items')
      .end(function(err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(2);
        done();
      });
    });
  });

  it('should return an error if the url does not exist', (done) => {
    chai.request(app)
    .get('/api/v1/item')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      done()
    })
  })

  describe('POST /api/v1/items', function () {

        it('should add a new item', function(done) {
        chai.request(app)
        .post('/api/v1/items')
        .send({ name: 'josh', reason: 'cool', clean: 'dusty' })
        .end(function(err, res) {
          if(err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('reason');
          expect(res.body).to.have.property('clean');
          done();
        });
      });
    });
//
// describe('GET /api/folders/:folderId', function() {
//   beforeEach(function(done){
//     const folders = [{name: 'baby duck pic        collection', id: 1},
//     {name: 'travel blogs', id: 2}];
//     app.locals.folders = folders;
//       done();
// });
//
//   afterEach(function(done){
//     app.locals.folders = [];
//       done();
//   });
//
//   context('if folder is valid', function(){
//     it('should display list of urls',     function(done) {
//       chai.request(app)
//        .post('/api/folders')
//        .send({ name: 'url1'})
//        .end(function(err, res) {
//          console.log('l');
//          if (err) { done(err); }
//          expect(res).to.have.status(200);
//          expect(res).to.be.json;
//          expect(res.body).to.be.a('object');
//          expect(res.body).to.have.property('name');
//          done();
//        });
//     });
//   });
//
//   describe('POST /api/folders/:folderId', function() {
//     afterEach(function(done) {
//       app.locals.urls= [{ date: 03-15-17, url: 'url', folderId: 'Y39kn3', id: 5}];
//       done();
//     });
//
//     it('should add a new url', function(done) {
//     chai.request(app)
//     .post('/api/folders/:folderId')
//     .send({ url: 'url' })
//     .end(function(err, res) {
//       if(err) { done(err); }
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('object');
//       expect(res.body).to.have.property('url');
//       expect(res.body.url).to.equal('url');
//       done();
//     });
//   });
// });
// });
