const userRoutes = require('./user_routes');
const libraryRoutes = require('./library_routes');

module.exports = function(app, db, mailer) {
  userRoutes(app, db, mailer);
  libraryRoutes(app, db);
};
