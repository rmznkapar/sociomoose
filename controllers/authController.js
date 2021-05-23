const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

// sifreyi hashliyor
const hashPass = (pass) => new Promise((resolve, reject) => {
  bcrypt.hash(pass, 10, (err, hash) => {
    if (err) {
      reject(err);
    } else {
      resolve(hash);
    }
  })
})

const postLogin = async (req, res) => {
  const userForm = {
    username: req.body.username,
    email: req.body.email || req.body.username,
    password: req.body.password
  }

  // boyle bir kullanici var mi diye kontrol eder yok ise error dondurur
  const user = await getUser(userForm.username, userForm.email);
  if (!user) {
    return res.json({error: 'USER_DOESNT_EXIST'});
  }

  //sifreyi eslestirir
  const bResult = await bcrypt.compare(userForm.password, user.password);

  if (bResult) {
    const token = jwt.sign({
        username: user.username,
        userId: user.id
      },
      'kardesim-helikopter-patpat', {
        expiresIn: '7d'
      }
    );
    db.query(
      'UPDATE users SET last_login = now() WHERE id = ?',
      [user.id]
    );
    return res.status(200).send({
      error: false,
      data: {
        token,
        user: user
      }
    });
  } else {
    res.json({error: 'WRONG_PASSWORD'})
  }
}

const postRegister = async (req, res) => {
  const newUserForm = {
    username: req.body.username,
    email: req.body.email,
    password: await hashPass(req.body.password)
  }

  // boyle bi kullanici var mi diye kontrol eder var ise error dondurur
  const user = await getUser(newUserForm.username, newUserForm.email);
  if (user) {
    return res.json({error: 'USER_ALREADY_EXIST'});
  }

  db.query(' INSERT INTO users SET ? ', newUserForm, async (err, rows) => {
    if (err) {
      return res.json({error: err})
    } else {
      const user = await getUser(newUserForm.username, newUserForm.email);

      const token = jwt.sign({
          username: user.username,
          userId: user.id
        },
        'kardesim-helikopter-patpat', {
          expiresIn: '7d'
        }
      );
      db.query(
        'UPDATE users SET last_login = now() WHERE id = ?',
        [user.id]
      );
      return res.status(200).send({
        error: false,
        data: {
          token,
          user: user
        }
      });
      res.json({error: false});
    }
  });
}

const getUser = (username, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      ' SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email],
      (err, rows) =>{
        if (err) {
          reject(err)
        } else {
          if (rows.length > 0) {
            resolve(rows[0]);
          } else {
            resolve(false);
          }
        }
      }
    )
  })
}

module.exports = {
  postRegister: postRegister,
  postLogin: postLogin
};