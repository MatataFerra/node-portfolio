const { response } = require('express');
const Comment = require('../models/Comments');
const { checkRegExp } = require('../../../../helpers/regex');

const getComments = (req, res = response) => {
  Comment.find()
  .then(data => {
    return res.status(200).json({
      message: 'List of comments',
      ok: true,
      data: data.map(comment => {
        return {comment: comment, date: comment.date.toLocaleString('es-AR', {day: '2-digit', month: '2-digit', year: '2-digit'})}
      })
    })
  })
  .catch(error => {
    console.log(error);
    return res.status(400).json({
      message: 'Hubo un error a la hora de hacer la petición',
      ok: false,
      data: null
    })
  })

}

const createComment = (req, res = response) => {

  const { client_name, client_email, client_comment } = req.body;

  const checkEmail = checkRegExp(client_email);

  if(!checkEmail) {
    return res.status(400).json({
      ok: false,
      message: 'email incorrecto',
      data: null
    })
  }
  const newComment = new Comment({
    client_name,
    client_email,
    client_comment
  });

  newComment.save()
  .then(comentCreate => {
    return res.status(201).json({
      ok: true,
      message: 'Comentario creado con éxito',
      data: comentCreate
    });
  })
  .catch(error => {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: 'Ocurrió un error a la hora de crear el comentario',
      data: null
    });
  })
  
}

module.exports = {
  getComments,
  createComment
}