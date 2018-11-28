const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5bfe1ed3f49fb5661887ad37';

// if (!ObjectID.isValid(id)) {
//   console.log('Invalid Object ID');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) => {
//   console.log('Todo by Id', todo);
// }).catch((e) => {
//   console.log(e);
// });

User.findById('5bfd0c1ac604b836d4b5d79d').then((user) => {
  // If ID is not found, the user object is null
  if (!user) {
    return console.log('Unable to find user');
  }

  console.log('user by id', user);
}).catch((err) => {
  console.log(err);
});