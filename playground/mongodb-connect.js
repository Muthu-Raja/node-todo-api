//const MongoClient = require('mongodb').MongoClient;

//Object destructuring example
// let user = {name: 'Bob', age: 25};
// let {name} = user; // it creates and assigns the name property value from an object to another variable
// console.log(name);

const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db("TodoApp");

  // // Create collection, documents, and fields
  // db.collection('Todos').insertOne({
  //   text: 'Some text here',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Muthu Raja',
  //   age: 33,
  //   location: 'Hong Kong'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }

  //   //console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  // Close DB connection
  client.close();
});