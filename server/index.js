const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const app = express();
const UserSchema = require('./models/UserSchema.js');
const router = express.Router();
const middleRouter = express.Router();


mongoose.connect('mongodb://localhost/user-auth');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use((req, res, next) => {
  console.log('something is happening');
  next();
});

middleRouter.use((req, res, next) => {
    return UserSchema.findOne({username: req.body.username}, (userErr, username) => {
      console.log(userErr, username);
      if (userErr || username) {
        return res.status(401).end();
      }
      // pass user details onto next route
      // req.username = username
      console.log()
      return next();
    });
  });

router.get('/', (req, res) => {
  res.json({message: 'yay our database works'});
});

middleRouter.route('/')
  .post((req, res) => {
    const userId = new UserSchema();
    userId.username = req.body.username;
    userId.password = req.body.password;
    userId.save(err => {
      if(err)
        res.send(err);
      res.json({message: 'new secure user!'});
    });
  })

router.route('/userId')
  .post((req, res) => {
    const userId = new UserSchema();
    userId.username = req.body.username;
    userId.password = req.body.password;
    userId.save(err => {
      if(err)
        res.send(err);
      res.json({message: 'new user!'});
    });
  })
  .get((req, res) => {
    UserSchema.find((err, userId) => {
      if(err)
        res.send(err);
      res.json(userId);
    });
  });



app.use('/api', router);
app.use('/hogsmeade', middleRouter);

app.listen(port);
console.log(`magic happens on port ${port}`);
