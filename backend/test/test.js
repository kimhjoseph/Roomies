const session = require('supertest-session');
const app = require('../server');

var testSession = null;

beforeEach(() => {
  testSession = session('http://localhost:4000');
});

it('should sign in', (done) => {
  testSession.post('/user/login')
    .send({ email: 'test@gmail.com', password: 'test' })
    .expect(201)
    .end(done);
});

describe('after authenticating session', () => {
  var authenticatedSession;

  beforeEach((done) => {
    testSession.post('/user/login')
      .send({ email: 'test@gmail.com', password: 'test' })
      .expect(201)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });

  it('should create apartment', (done) => {
  	authenticatedSession.get('/apartment/create')
  	  .expect(200)
  	  .end(done)
  });

  it('should join apartment', (done) => {
  	let data = {
  		code: 'vu7Bp'
  	}
  	authenticatedSession.post('/apartment/join')
  	  .send(data)
  	  .set('Accept', 'application/json')
  	  .expect(201)
  	  .end(done)
  });

  it('should return users', (done) => {
    authenticatedSession.get('/user/get')
      .expect(200)
      .end(done)
  });

  it('should return current user', (done) => {
  	authenticatedSession.get('/user/get_current_user')
  	  .expect(200)
  	  .end(done)
  });

  it('should add chore item', (done) => {
  	let data = {
  		userName: "Test User",
  		description: "Clean",
  		days: 5
  	}

  	authenticatedSession.post('/choreitem/add')
  	  .send(data)
  	  .set('Accept', 'application/json')
  	  .expect(201)
  	  .end(done)
  });

  it('should get all chore items', (done) => {
  	authenticatedSession.get('/choreitem/get_all_items')
  	.expect(200)
  	.end(done)
  });

  it('should delete all chore items', (done) => {
  	authenticatedSession.delete('/choreitem/delete_all_items')
  	  .expect(200)
  	  .end(done)
  });

  it('should add shopping list item', (done) => {
  	let data = {
  		people: ["Test User"],
  		item: "Bananas",
  		description: "3 yellow ones!"
  	}

  	authenticatedSession.post('/shoppingitem/add')
  	  .send(data)
  	  .set('Accept', 'application/json')
  	  .expect(201)
  	  .end(done)
  });
  
  it('should get all shopping list items', (done) => {
  	authenticatedSession.get('/shoppingitem/get')
  	  .expect(200)
  	  .end(done)
  });

});
