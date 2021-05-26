const db = require('../lib/db.js');

const getProfile = (req, res) => {
  db.query(
    ` SELECT users.id, users.username, users.email,
    (SELECT COUNT(*) FROM follows WHERE users.id = follows.following_id AND follows.follower_id = ?) AS following
     FROM users WHERE id = ? `,
    [parseInt(req.userData.userId), parseInt(req.body.user_id)],
    (err, rows) => {
      if (err) {
        return res.json({
          data: false,
          error: err
        })
      } else {
        if (rows.length > 0) {
          return res.json({
            error: false,
            data: rows[0]
          });
        } else {
          return res.json({
            data: false,
            error: 'USER_DOESNT_EXIST'
          })
        }
      }
    }
  )
}

const followUser = (req, res) => {
  const followForm = {
    following_id: req.body.following_id, //takip edilen kisi
    follower_id: req.userData.userId, //takip eden kisi
  }

  if (followForm.following_id === followForm.follower_id) {
    return res.json({error: 'SAME_USERS', data: false})
  }

  db.query(` 
    INSERT INTO follows (following_id, follower_id)
    SELECT * FROM (SELECT ? AS d, ?) AS tmp
    WHERE NOT EXISTS (
      SELECT following_id, follower_id FROM follows WHERE following_id = ? AND follower_id = ?
    ) LIMIT 1`, 
    [followForm.following_id, followForm.follower_id, followForm.following_id, followForm.follower_id], 
    async (err, rows) => {
      if (rows && rows.affectedRows < 1) {
        db.query(
          'DELETE FROM follows WHERE following_id = ? AND follower_id = ?',
          [followForm.following_id, followForm.follower_id],
          async (err, rows) => {
            if (err) {
              return res.json({error: err})
            } else {
              return res.json({
                data: {
                  unfollow: true,
                  follow: false 
                },
                error: false
              })
            }
          }
        )
      } else {
        if (err) {
          return res.json({error: err})
        } else {
          return res.json({
            data: {
              unfollow: false,
              follow: followForm 
            },
            error: false
          })
        }
      }
    }
  )
}

module.exports = {
  getProfile: getProfile,
  followUser: followUser
};