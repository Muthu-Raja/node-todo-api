const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.deleteMany({}).then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });

Todo.findByIdAndRemove('5bff9590cee56832e4360627').then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});