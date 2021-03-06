/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/resetpw', require('./api/resetpw'));
  app.use('/api/complaints', require('./api/complaint'));
  app.use('/api/votes', require('./api/vote'));
  app.use('/api/lists', require('./api/list'));
  app.use('/api/categories', require('./api/category'));
  // app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.route('/resetpw/:key').get(function(req, res, next) {
    var tracer = require('tracer').console({ level: 'debug' });
    var rpw = require('./api/resetpw/resetpw.controller');
    tracer.debug(rpw);
    rpw.resetpw(req, res);
  });
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
