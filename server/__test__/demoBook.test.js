const request = require('supertest');
const app = require('../app');




describe('GET /books', () => {

  test('200 should fetch books data from external API', (done) => {
    request(app)
      .get('/books?q=programmer')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toBe(200);
        done();
      });
  });

})

describe('GET /books/:id', () => {

  test('200 should fetch books data by Id from external API', (done) => {
    const id = 'GmX8DwAAQBAJ'
    request(app)
      .get(`/books/${id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toBe(200);
        done();
      });
  });

})

