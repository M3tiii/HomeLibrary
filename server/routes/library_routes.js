const ObjectID = require('mongodb').ObjectID;
const Library = require('../models/library');

module.exports = function(app, db) {

  db.collection('library').ensureIndex({ "username": 1 }, { unique: true });

  app.put('/library/:username', (req, res) => {

    //Find library of username
    db.collection('library').findOne({ username: req.params.username }, function(error, library) {
      let targetUser = {};

      if (!library) {
        res.send({ 'error': 'Can not find library' });
        return;
      }

      let check = new Promise((resolve, reject) => {

        let checked = 0;

        //Check owner library
        let isAccess = (library.username == req.body.username && library.password == req.body.password);
        if (isAccess) { 
          db.collection('users').findOne({ username: req.body.username }, function(error, user) {
            targetUser = user;
            resolve(false);
          });
        };

        if(!isAccess) {
        //Library is empty, send error
          if (library.members.length == 0)
            resolve("Library is empty");

          //Check by each member
          library.members.forEach(member => { db.collection('users').findOne({ username: member }, function(error, user) {
              if (user && user.username == req.body.username && user.password == req.body.password) {
                isAccess = true;
                targetUser = user;
                console.log('aha', user);
                resolve(false);
              }
              //All members are checked, send error
              if (++checked == library.members.length)
                resolve("Denied permission");
            })
          })
        }
      })

      //Parse library to respond
      check.then((error) => {
        if (!error) {

          //update user details: last read title, last read time
          const userDetails = JSON.parse(req.body.userDetails);
          if (userDetails.hasOwnProperty('lastTime')) {
            const userDetails = JSON.parse(req.body.userDetails);
            if(userDetails.lastTitle !== '')
              targetUser.lastRead = userDetails.lastTitle;
            if(userDetails.lastTime > 0)
              targetUser.totalRead += userDetails.lastTime;
            db.collection('users').update({'_id': new ObjectID(targetUser._id) }, targetUser, (err, result) => {
              if (err) {
                res.send({ 'error': 'Can not change user' });
                return;
              }
            });

          }

          if (req.body.data) library.data = JSON.parse(req.body.data);
          // if (req.body.members) library.members = JSON.parse(req.body.members);
          db.collection('library').update({'_id': new ObjectID(library._id) }, library, (err, result) => {
            if (err) {
              res.send({ 'error': 'Can not change library' });
              return;
            } else {
              // console.log(targetUser);
              res.send(targetUser);
            }
          });
        } else {
          res.send({ error });
          return;
        }
      })
    })
  });


  app.get('/library/:name', (req, res) => { db.collection('library').findOne({ username: req.params.name }, function(error, library) {
      if (!library) {
        res.send({ 'error': 'Can not find library' });
        return;
      }
      res.send(library);
    })
  });
};
