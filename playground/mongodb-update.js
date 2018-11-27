const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db("TodoApp");

  // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5bfbc11f5300bc432c10d296')}, {$set: {completed: true}}, {returnOriginal: false})
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  db.collection('Users').findOneAndUpdate({name: 'Jackson Benson'}, {$inc: {age: 1}, $set: {name: 'Muthu Raja'}}, {returnOriginal: false}
  )
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

  // Close DB client connection
  client.close();
});