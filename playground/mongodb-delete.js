const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db("TodoApp");

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'test delete'})
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log('Unable to delete todos', err);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'test delete'})
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false})
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  // db.collection('Users').deleteMany({name: 'Muthu Raja'})
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5bfca7fb8062382be4808a97')})
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });


  // Close DB client connection
  client.close();
});