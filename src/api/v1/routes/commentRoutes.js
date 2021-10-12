const routes = require('express').Router();
const { validateJwt } = require('../../../../helpers/jwt');
const { createComment, getComments } = require('../controllers/comments')


routes.post('/v1/comments', createComment);
routes.get('/v1/comments', validateJwt, getComments);

module.exports = routes

