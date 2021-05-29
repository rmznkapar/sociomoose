var multer = require('multer')
const path = require('path');
const db = require('../lib/db.js');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/posts/');
  },

  filename: function(req, file, cb) {
    cb(null, req.userData.userId + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadPost = (req, res) => {
  const upload = multer({ storage: storage }).single('img_file');

  upload(req, res, function(err) {

    const uploadForm = {
      user_id: req.userData.userId,
      content: req.body.content,
    }

    if (req.file) {
      uploadForm.img_name = req.file.filename
    }


    else if (err instanceof multer.MulterError) {
      return res.json({error: 'MULTER'});
    }
    else if (err) {
      return res.json({error: 'UNKNOWN'});
    }
    if (!uploadForm.content || uploadForm.content.length < 1) {
      return res.json({error: 'INVALID_CONTENT'});
    }
    if (uploadForm.content.length > 1000) {
      return res.json({error: 'MAX_CHAR_CONTENT'});
    }

    db.query(' INSERT INTO posts SET ? ', uploadForm, async (err, rows) => {
      if (err) {
        return res.json({error: err})
      } else {
        return res.json({
          error: false,
          data: {
            post: uploadForm
          }
        });
      }
    });
  });

  // return res.json({error: false})
}

const getAllPosts = (req, res) => {

  const isGetUserPostsSQL = req.body.user_id ? ` WHERE posts.user_id = ${req.body.user_id} ` : '';

  db.query(
    ` SELECT users.*, posts.*, 
      (SELECT COUNT(*) FROM likes WHERE posts.id = likes.post_id) AS like_count,
      (SELECT COUNT(*) FROM likes WHERE posts.id = likes.post_id AND likes.user_id = ?) AS liked,
      (SELECT COUNT(*) FROM comments WHERE posts.id = comments.post_id) AS comment_count 
      FROM posts
      INNER JOIN users ON posts.user_id = users.id  
      `+isGetUserPostsSQL+`
      ORDER BY posts.date DESC 
      LIMIT ? OFFSET ? ` ,
    [req.userData.userId, req.body.limit, req.body.offset],
    async (err, rows) => {
      if (err) {
        return res.json({
          data: null, 
          error: err
        })
      } else {
        if (rows.length > 0) {
          return res.json({
            error: false,
            data: rows
          });
        } else {
          return res.json({
            data: null,
            error: 'BAD_REQUEST'
          })
        }
      }
    }
  );
}

const getSpecPost = (req, res) => {
  db.query(
    ` SELECT posts.*, follows.*, users.username, users.id AS user_id,
      (SELECT COUNT(*) FROM likes WHERE posts.id = likes.post_id) AS like_count,
      (SELECT COUNT(*) FROM likes WHERE posts.id = likes.post_id AND likes.user_id = ?) AS liked,
      (SELECT COUNT(*) FROM comments WHERE posts.id = comments.post_id) AS comment_count 
      FROM posts 
      INNER JOIN users ON posts.user_id = users.id 
      LEFT JOIN follows ON users.id = follows.following_id 
      WHERE follows.follower_id = ? 
      LIMIT ? OFFSET ? `,
    [req.userData.userId, req.userData.userId, req.body.limit, req.body.offset],
    async (err, rows) => {
      if (err) {
        return res.json({
          data: null, 
          error: err
        })
      } else {
        return res.json({
          error: false,
          data: rows
        });
      }
    }
  )
}

const likePost = (req, res) => {
  const likeForm = {
    user_id: req.userData.userId,
    post_id: req.body.post_id
  }

  db.query(` 
    INSERT INTO likes (post_id, user_id)
    SELECT * FROM (SELECT ? AS d, ?) AS tmp
    WHERE NOT EXISTS (
      SELECT post_id, user_id FROM likes WHERE post_id = ? AND user_id = ?
    ) LIMIT 1`, 
    [likeForm.post_id, likeForm.user_id, likeForm.post_id, likeForm.user_id], 
    async (err, rows) => {
      if (rows && rows.affectedRows < 1) {
        db.query(
          'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
          [likeForm.post_id, likeForm.user_id],
          async (err, rows) => {
            if (err) {
              return res.json({error: err})
            } else {
              return res.json({
                data: {
                  dislike: true,
                  like: false 
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
              dislike: false,
              like: likeForm 
            },
            error: false
          })
        }
      }
    }
  )
}

const makeComment = async (req, res) => {
  const commentForm = {
    content: req.body.content,
    post_id: req.body.post_id,
    user_id: req.userData.userId
  }

  if (commentForm.content.length < 1) {
    return res.json({error: 'EMPTY_CONTENT', data: false});
  }

  db.query(
    ` INSERT INTO comments SET ? `, 
    commentForm, 
    async (err, rows) => {
      if (err) {
        return res.json({error: err})
      } else {
        return res.json({
          error: false,
          data: {
            post: commentForm
          }
        });
      }
    }
  )

}

const getComments = async (req, res) => {
  db.query(
    ` SELECT * FROM comments INNER JOIN users ON comments.user_id = users.id WHERE post_id = ? `,
    [req.body.post_id],
    async (err, rows) => {
      if (err) {
        return res.json({error: err})
      } else {
        return res.json({
          error: false,
          data: {
            comments: rows
          }
        });
      }
    }
  )
}

const deletePost = async (req, res) => {
  db.query(
    ` DELETE FROM posts WHERE id = ? AND user_id = ? `,
    [req.body.post_id, req.userData.userId],
    async (err, rows) => {
      if (err) {
        return res.json({error: err})
      } else {
        return res.json({
          error: false,
          data: true
        });
      }
    }
  )
}

module.exports = {
  uploadPost: uploadPost,
  getAllPosts: getAllPosts,
  getSpecPost: getSpecPost,
  likePost: likePost, 
  makeComment: makeComment,
  getComments: getComments,
  deletePost: deletePost
};