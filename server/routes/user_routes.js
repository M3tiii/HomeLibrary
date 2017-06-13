const ObjectID = require('mongodb').ObjectID;
const User = require('../models/user');
const Library = require('../models/library');

module.exports = function(app, db, mailer) {

  db.collection('users').ensureIndex({
    "username": 1
  }, {
    unique: true
  });

  // //Get data of user by username
  // app.get('/user/:name', (req, res) => {
  //   db.collection('users').findOne({
  //     username: req.params.name
  //   }, function(error, user) {
  //     if (!user) {
  //       res.send({
  //         'error': 'That user does not exist'
  //       });
  //       return;
  //     }
  //     res.send(user);
  //   })
  // });

  //Post authorized actions
  app.post('/login', (req, res) => {
    db.collection('users').findOne({
      username: req.body.username
    }, function(error, user) {
      if (!user) {
        res.send({
          'error': 'That user does not exist'
        });
        return;
      } else if (user.password != req.body.password) {
        res.send({
          'error': 'Denied permission'
        });
        return;
      }
      // const details = {
      //   '_id': new ObjectID(user._id)
      // };
      // if (user.members != req.body.members) {
      //   console.log('change members');
      //   db.collection('users').update(details, item, (err, result) => {
      //     if (err) {
      //       res.send({
      //         'error': 'Can not change user'
      //       });
      //       return;
      //     } else {
      //       res.send("Thank you for accept mail.");
      //     }
      //   });
      // }
      res.send(user);
    })
  });

  //Send member link
  app.get('/addmember/:id/:newuser', (req, res) => {
    db.collection('users').findOne({
      _id: new ObjectID(req.params.id)
    }, function(error, fromUser) {
      console.log(new ObjectID(req.params.id));
      if (!fromUser) {
        res.send({
          'error': 'That user does not exist'
        });
        return;
      }
      db.collection('users').findOne({
        username: req.params.newuser
      }, function(error, toUser) {
        if (!toUser) {
          res.send({
            'error': 'You are not registered'
          });
          return;
        } else {
          if (toUser.members.indexOf(fromUser.username) != -1) {
            res.send({
              'error': 'You were added before'
            });
            return;
          } else {
            db.collection('library').findOne({
              username: fromUser.username
            }, function(error, library) {
              if (error) {
                res.send({
                  'error': 'Can not find your library'
                });
                return
              } else {
                toUser.members.push(fromUser.username);
                library.members.push(req.params.newuser);
                db.collection('users').update({
                  '_id': new ObjectID(toUser._id)
                }, toUser, (err, result) => {
                  if (err) {
                    res.send({
                      'error': 'Can not change user'
                    });
                    return;
                  }
                });
                db.collection('library').update({
                  '_id': new ObjectID(library._id)
                }, library, (err, result) => {
                  if (err) {
                    res.send({
                      'error': 'Can not change library'
                    });
                    return;
                  }
                  res.send("You are added to " + fromUser.username + " library.");
                });
              }
            })
          }
        }
      });
    })
  });

  //Accept user by verification link
  app.get('/accept/:id', (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({
          'error': 'That user does not exist'
        });
        return;
      } else {
        //Update user data
        item.accepted = true;
        db.collection('users').update(details, item, (err, result) => {
          if (err) {
            res.send({
              'error': 'Can not change user'
            });
            return;
          } else {
            res.send("Thank you for accept mail.");
          }
        });
      }
    });
  });

  //Create new user and sand verification mail
  app.post('/register', (req, res) => {

    const user = User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      members: [req.body.username]
    });

    const library = Library({
      username: req.body.username,
      password: req.body.password,
      data: req.body.email,
      members: [req.body.username]
    });

    db.collection('users').insert(user, (errUser, resultUser) => {
      db.collection('library').insert(library, (errLib, resultLib) => {
        if (errUser || errLib) {
          res.send({
            'error': 'Can not change user'
          });
          return;
        } else {
          res.send(resultUser.ops[0]);

          //Prepare verification mail
          let text = `<h1>Hello ${req.body.username}</h1>\n<p>Accept your account\n</p><a href='http://localhost:8000/accept/${user._id}'>ACCEPT ✔</a>`;
          const mailOptions = {
            from: 'mySuperAnnonymusMail@gmail.com',
            to: 'mySuperAnnonymusMail@gmail.com',
            subject: 'Email Example',
            html: text
          };

          //Send verification mail
          mailer.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Message sent: ' + info.response);
            };
          });
        }
      });
    });
  });
};
