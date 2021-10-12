const { response, request } = require('express');
const jwt = require('jsonwebtoken')

const validateJwt = (req = request, res = response, next) => {

  const token = req.header('x-token');

  if( !token ) {
    return res.status(401).json({
      ok: false,
      message: 'Token no válido',
      data: null
    })
  }

  try {
    const { uid, name } = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    req.uid = uid
    req.name = name

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: 'Token no coincide',
      data: null
    })
  }
  next();
  
}

const generateJwt = (uid, name) => {

  return new Promise((resolve, reject) => {

    const payload = { uid, name }

    jwt.sign( payload,  process.env.SECRET_KEY, {
      expiresIn: '2h'
    }, (err, token) => {
      if( err ){
        console.log(err);
        reject('No se pudo generar el token')
      }
      resolve( token )
    })
    
  })
  
  
}


module.exports = {
  validateJwt,
  generateJwt
}