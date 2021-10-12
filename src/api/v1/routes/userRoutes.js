const routes = require('express').Router();
const { login, signup, getUsers } = require('../controllers/users');
const { validateJwt } = require('../../../../helpers/jwt');

// Add routes
routes.post('/v1/signup', signup);
routes.post('/v1/login', login);
routes.get('/v1/users', validateJwt, getUsers);


module.exports = routes;