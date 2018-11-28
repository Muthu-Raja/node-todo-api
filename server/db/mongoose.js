const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const userName = 'admin';
const password = 'admin123';
const db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: `mongodb://${userName}:${password}@ds119304.mlab.com:19304/todo-app-api`
};

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});
mongoose.connect(process.env.PORT ? db.mlab : db.localhost, {useNewUrlParser: true});

module.exports = {
  mongoose,
  ObjectID
};