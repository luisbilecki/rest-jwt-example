// Node modules
const { generateJWT } = require('../../src/services/loginService');

// Dummy data
const dummyData = {
    userId: 1,
    userEmail: 'geralt@dev.com',
    userName: 'Geralt',
};

// Functions to export
const validToken = generateJWT(dummyData);
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const expiredToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoibHVpcyIsImlhdCI6MTU1NTc3NTYxMSwiZXhwIjoxNTU1Nzc1NjcxLCJhdWQiOiJ1ZGVzY3RlY2hub2xvZ3kuY29tLmJyIiwiaXNzIjoidWRlc2N0ZWNobm9sb2d5LmNvbS5iciIsInN1YiI6Imx1aXMuYmlsZWNraUBnbWFpbC5jb20ifQ.pNZ-zS_W9Niysf4-7MjiTzjp59sS4qu0wx_gnaef-0bE1Z991epxZyvTlRtuGXHnLMPSl3IiDPeZx_oJWhXNNYRFiADJtJBzrtL3ASuQeAIsYBKyhCGlTgY82lWSMP2HRO3hOWVHzU8S_bREdUKQjMQ32JkR0XgbxsOsETdXrBI';

module.exports = {
    validToken,
    invalidToken,
    expiredToken,
};
