const jwt = require('jsonwebtoken');

const validateRegister = (req, res, next) => {
  // kullanici adi minimum 3 karakter
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).send({
      error: 'SHORT_USERNAME'
    });
  }
  // sifre minumum 6 karakter
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      error: 'SHORT_PASSWORD'
    });
  }
  next();
}

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const decoded = jwt.verify(
      token,
      'SECRETKEY'
    );
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      error: 'INVALID_SESSION'
    });
  }
}

module.exports = {
  validateRegister: validateRegister,
  isLoggedIn: isLoggedIn
};