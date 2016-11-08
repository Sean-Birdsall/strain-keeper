var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_INDEX = 10, // the larger it is , the stronger the encryption, but it will take longer
    UserSchema = new mongoose.Schema({
      username: { type: String, unique: true },
      email: { type: String, unique: true },
      password: String,
      strainCount: { type: Number, default: 0},
      strainArray: { type: Array, default: []},
      created: { type: Number, default: () => Date.now() }
    });

    UserSchema.pre('save', function(next){
      var user = this; // new User(req.body);

      if( !user.isModified('password')) {
        return next();
      }

      bcrypt.genSalt(SALT_INDEX, (saltErr, salt) => {
        if (saltErr) {
          console.error(saltErr);
          return next(saltErr);
        }
        console.info('SALT GENERATED: ', salt);

        bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
          if (hashErr){
            console.log(hashErr);
            return next(hashErr);
          }
          user.password = hashedPassword;
          next();
        });
      });

    });

module.exports = mongoose.model('User', UserSchema);
