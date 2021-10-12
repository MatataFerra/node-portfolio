const { response } = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/Comments');
const { checkRegExp } = require('../../../../helpers/regex');

const getComments = async (req, res = response) => {
  const comments = await Comment.find();

  return res.status(200).json({
    message: 'List of comments',
    ok: true,
    data: comments
  })
}

const createComment = async (req, res = response) => {

  const { name, email, phone, text } = req.body;

  const checkEmail = checkRegExp(email);

  if(!checkEmail) {
    return res.status(400).json({
      ok: false,
      message: 'email incorrecto',
      data: null
    })
  }

  try {
    const newComment = new Comment({
      name,
      email,
      phone,
      text,
      date: Date.now().toLocaleString('es-AR', {day: '2-digit', month: '2-digit', year: '2-digit'})
    });
  
    await newComment.save();
    await mongoose.connection.close();
  
    return res.status(201).json({
      ok: true,
      message: 'Comentario creado con éxito',
      data: newComment
    });
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      ok: false,
      message: 'Ocurrió un error a la hora de crear el comentario',
      data: null
    });
  }

}

module.exports = {
  getComments,
  createComment
}