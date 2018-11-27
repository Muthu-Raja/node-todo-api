let mongoose = require('mongoose');

// Define User schema
let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

// let newUser = new User({
//   email: 'abc@123.com'
// });

// newUser.save().then((result) => {
//   console.log(JSON.stringify(result, undefined, 2));
// }).catch((err) => {
//   console.log(err);
// });

module.exports.User = User;