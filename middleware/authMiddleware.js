const jwt = require('jsonwebtoken');

const validateRegister = (req, res, next) => {
  // kullanici adi minimum 3 karakter
  if (!req.body.username || req.body.username.length < 3) {
    return res.json({
      error: 'SHORT_USERNAME'
    });
  };

  //kullanici adi ozel karakter 
  if (!(/^[a-zA-Z0-9]+$/).test(req.body.username)) {
    return res.json({
      error: 'BAD_USERNAME'
    });
  };
  
  //mail kontrol
  if (!(/\S+@\S+\.\S+/).test(req.body.email)) {
    return res.json({
      error: 'BAD_EMAIL'
    });
  };
  
  // sifre minumum 6 karakter
  if (!req.body.password || req.body.password.length < 6) {
    return res.json({
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
      'kardesim-helikopter-patpat'
    );
    req.userData = decoded;
    next();
  } catch (err) {
    return res.json({
      error: 'INVALID_SESSION'
    });
  }
}

module.exports = {
  validateRegister: validateRegister,
  isLoggedIn: isLoggedIn
};