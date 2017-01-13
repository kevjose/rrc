const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');


module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'index.html');
    const publicPath = express.static(path.join(__dirname, 'public'));

    if (process.env.NODE_ENV !== 'production') {
      const webpack = require('webpack')
      const webpackDevMiddleware = require('webpack-dev-middleware')
      const webpackHotMiddleware = require('webpack-hot-middleware')
      const config = require('./webpack.dev.config.js')
      const compiler = webpack(config)

      app.use(webpackHotMiddleware(compiler))
      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
      }))
    }
    mongoose.connect('mongodb://localhost:27017/test');
    mongoose.connection.on('error', function() {
      console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
      process.exit(1);
    });

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    app.use(cookieParser());
    app.use('/public', publicPath);
    app.use(function(req, res, next) {
      req.isAuthenticated = function() {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
          return jwt.verify(token, 'e0ff266e44567db94ca2a179e3bdedb603b394ecec9c2db68ce20e2ce232dd9e');
        } catch (err) {
          return false;
        }
      };

      if (req.isAuthenticated()) {
        var payload = req.isAuthenticated();
        User.findById(payload.sub, function(err, user) {
          req.user = user;
          next();
        });
      } else {
        next();
      }
    });

    app.get('*', function (req, res) { res.sendFile(indexPath) });

    app.post('/api/user', function(req, res){
      res.send({success: true});
    })

    app.post('/auth/google', userController.authGoogle);
    app.get('/auth/google/callback', userController.authGoogleCallback);

    app.post('/api/authenticate/user', function(req, res){
      res.send({user:req.user});
    })

    return app;
  }
}
