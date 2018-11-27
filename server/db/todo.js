let mongoose = require('mongoose');

// Define Todo schema
let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// // create a new record 
// let newTodo = new Todo({
//   text: 'Test'
// });

// newTodo.save().then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });

module.exports.Todo = Todo;