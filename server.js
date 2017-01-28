const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flock = require('flockos');
const fs = require('fs');
flock.setAppId("e3c5b901-3705-4794-bf03-68193dfe98a6");
flock.setAppSecret("3dd0bfd3-f23a-4e56-91e3-74a0e62cc006");

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');


module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'index.html');
    const publicPath = express.static(path.join(__dirname, 'public'));
    var mongoUri = "mongodb://kevin:opensesm@ds035723.mlab.com:35723/goplanr";
    if (process.env.NODE_ENV !== 'production') {
      mongoUri = "mongodb://localhost:27017/test"
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
    console.log(mongoUri);
    mongoose.connect(mongoUri);
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
    if (app.get('env') === 'production') {
      app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
      });
    }
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

    app.use(flock.events.tokenVerifier);
    app.post('/events', flock.events.listener);
    var tokens;
    try {
        tokens = require('./tokens.json');
    } catch (e) {
        tokens = {};
    }

    // save tokens on app.install
    flock.events.on('app.install', function (event) {
        tokens[event.userId] = event.token;
    });

    // delete tokens on app.uninstall
    flock.events.on('app.uninstall', function (event) {
        delete tokens[event.userId];
    });
    // exit handling -- save tokens in token.js before leaving
    process.on('SIGINT', process.exit);
    process.on('SIGTERM', process.exit);
    process.on('exit', function () {
        fs.writeFileSync('./tokens.json', JSON.stringify(tokens));
    });

    return app;
  }
}
