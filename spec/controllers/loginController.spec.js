// Node modules
const request = require('supertest');

// API
const app = require('../../index.js');

describe('LoginController', function() {
    describe('signIn()', function() {
        it('should do not sign with empty post data', function(done) {
            request(app)
                .post('/login/signIn')
                .set('Accept', 'application/json')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400, done);
        }); 

        it('should do not sign with invalid post data', function(done) {
            request(app)
                .post('/login/signIn')
                .set('Accept', 'application/json')
                .send({
                    userId: '1'
                })
                .expect('Content-Type', /json/)
                .expect(400, done);
        }); 

        it('should return jwt token when signed in', function(done) {
            request(app)
                .post('/login/signIn')
                .set('Accept', 'application/json')
                .send({
                    userId: 1,
                    userName: 'Keira',
                    userEmail: 'keira@magic.com',
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body.hasOwnProperty('token')).toBeTruthy();
                    expect(res.body.token).not.toBeNull();

                    done();
                });
        });
    });
});
