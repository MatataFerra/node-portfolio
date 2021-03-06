const { response } = require('express');
const mongoose = require('mongoose');
const brycpt = require('bcrypt');
const User = require('../models/User');
const { generateJwt } = require('../../../../helpers/jwt');
const { checkRegExp } = require('../../../../helpers/regex');


const signup = async (req, res = response) => {

  const { username, email, password, admin, is_admin } = req.body;

  try {

    const emailChecked = checkRegExp(email);
    
    if (admin !== process.env.ADMIN){
      return res.status(400).json({
        message: 'No tiene permisos para crear un usario, contactese con el administrador',
        data: null,
        ok: false,
      })
    }

    if(!emailChecked) {
      return res.status(400).json({
        ok: false,
        message: 'email incorrecto',
        data: null
      })
    }

    const usuario = await User.findOne({ email });
    
    if ( usuario ) {
      return res.status(400).json({
        ok: false,
        message: 'Un usuario existe con ese correo',
        data: null
      })
    }

    const newUser = new User({
      username,
      email,
      password,
      is_admin
    });

    const salt = brycpt.genSaltSync();
    newUser.password = brycpt.hashSync( password, salt );

    const token = await generateJwt(newUser._id, newUser.username);

    await newUser.save()

    return res.status(201).json({
      message: 'User created',
      ok: true,
      data: {newUser, token}
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Se produjo un error a la hora de crear el usuario',
      data: null
    })
  }

}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email });
    const validPassword = brycpt.compareSync( password, user.password )

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        message: 'Usuario/contraseña incorrectos', //No es recomendable dar el error exacto
        data: null
      })
    }

    if ( !user ) {
      return res.status(400).json({
        ok: false,
        message: 'Usuario/contraseña incorrectos', //No es recomendable dar el error exacto
        data: null
      })
    }

    if(!user.is_admin) {
      return res.status(400).json({
        ok: false,
        message: 'No posee permisos de administrador',
        data: null
      })
    }

    //Generar JWT
    const token = await generateJwt(user._id, user.username)

    res.status(200).json({
      message: 'Usuario loggeado correctamente',
      ok: true,
      data: token
    })
    
  } catch (error) {
    console.log('Has an error on auth controller');
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hubo un error a la hora de loggearte',
      data: null
    })
  }

}

const getUsers = async (req, res) => {
  const users = await User.find()

  return res.status(200).json({
    message: 'List of user',
    ok: true,
    data: users
  })
}

const validateTokenAndAuth = async (req, res) => {
  
  const { uid, name } = req

  const token = await generateJwt(uid, name)

  res.json({
    ok: true,
    token,
    uid, name,
  })

}


module.exports = {
  signup,
  login,
  validateTokenAndAuth,
  getUsers

}