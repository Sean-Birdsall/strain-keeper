var User = require('../models/user'),
    bcrypt = require('bcryptjs');

module.exports = {
  login: (req, res) => {
    console.log('LOGIN::POST::PAYLOAD::', req.body);

    User.findOne({
      email: req.body.email
    }, (err, user) =>{
      if(err){
        console.error('MongoDB Error: ', err);
        res.status(500).json(err);
      }
      if (!user) {
        console.warn('No user found!');
        res.status(403).json({ message: 'Nope' });
      } else {
        console.info('auth.login', user);

        bcrypt.compare(req.body.password, user.password, (compareErr, matched) =>{
          if(compareErr){
            console.error(compareErr);
            res.status(500).json(err);
          }
          else if (!matched) {
            console.warn('Password mismatch');
            res.status(403).json({ message: 'Nope' });
          } else {
            res.send({message: 'Login Success!'});
          }
        });
      }
    })
  },
  logout: (req, res) => {

  },
  register: (req, res) => {
    var newUser = new User(req.body);
    // when this function fires it is going to hit the pre save middleware
    newUser.save((err, user) => {
      if(err){
        return res.send(err);
      }
      res.send(user)
    });
  }
  ,
  middlewares: {
    session: (req, res) => { // this will be the middleware that checks for a loggedin user

    }
  }
}
