const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db("TodoApp");

  // db.collection('Todos').find().toArray()
  //   .then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   })
  //   .catch((err) => {
  //     console.log('Unable to fetch Todos', err)
  //   });

  // db.collection('Todos').find({completed: false}).toArray()
  //   .then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   })
  //   .catch((err) => {
  //     console.log('Unable to fetch Todos', err)
  //   });

  // // to search by object IDs use the ObjectID constructor
  // db.collection('Todos').find({
  //   _id: new ObjectID('5bfbc11f5300bc432c10d296')
  // }).toArray()
  // .then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // })
  // .catch((err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // to get count
  // db.collection('Todos').find({completed: true}).count()
  // .then((count) => {
  //   console.log('Todos', count);
  // })
  // .catch((err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({location: 'Australia'}).toArray()
  .then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  })
  .catch((err) => {
    console.log('Unable to fetch users', err);
  });

  // Close DB connection
  client.close();
});