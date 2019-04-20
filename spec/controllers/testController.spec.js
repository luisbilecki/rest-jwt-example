// Node modules
const request = require('supertest');

// API
const app = require('../../index.js');

// Fixtures
const { validToken, invalidToken, expiredToken } = require('../fixtures/token');

describe('Test Controller', function() {
    describe('publicRoute()', function() {
        it('should respond with \'public route\'', function(done) {
            request(app)
                .get('/public')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect('"public route"')
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    done();
                });
        });
    });
    describe('privateRoute()', function() {
        it('should respond with 401 unauthorized without token', function(done) {
            request(app)
                .get('/private')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401, done);
        });
        
        it('should respond with 401 uauthorized with invalid token', function(done) {
            request(app)
                .get('/private')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${invalidToken}`)
                .expect('Content-Type', /json/)
                .expect(401, done);            
        });

        it('should return 401 unauthorized when token is expired', function(done) {
            request(app)
                .get('/private')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${expiredToken}`)
                .expect('Content-Type', /json/)
                .expect(401, done);            
        });

        it('should return 200 ok and private route with valid token', function(done) {
            request(app)
                .get('/private')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${validToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect('"private route"')
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    done();
                });
        });
    });
});
