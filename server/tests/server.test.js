const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Seed data
const todos = [{
    text: 'First test todo',
    _id: new ObjectID()
  }, {
    text: 'Second test todo',
    _id: new ObjectID(),
    completed: true,
    completedAt: 333
  }
];

// Before every test case, remove all documents from the given collection
beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done()); 
});

describe('POST /todos', () => {

  it ('should create a new todo', (done) => {
    let text = 'Test test';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => {
          done(err);
        });
      }); 
  });

  it('should not create with invalid body data', (done) => {
    let text = '';

    request(app)
    .post('/todos')
    .send({text})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => {
        done(err);
      });

    });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it ('should return 404 if ID is invalid', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString() + "1"}`)
    .expect(404)
    .expect((res) => {
      expect(res.todo).toBe(undefined);
    })
    .end(done);
  });

  it ('should return 404 if ID not found', (done) => {
    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .expect((res) => {
      expect(res.body.todo).toBe(undefined);
    })
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('shoud delete todo doc', (done) => {
    let hexId = todos[1]._id.toHexString()
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    //.end(done);
    .end ((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(hexId).then((todo) => {
        expect(todo).toBeFalsy();
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  it ('should return 404 if ID not found', (done) => {
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .expect((res) => {
      expect(res.body.todo).toBe(undefined);
    })
    .end(done);
  });

  it ('should return 404 if ID is invalid', (done) => {
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .expect((res) => {
      expect(res.body.todo).toBe(undefined);
    })
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it ('should update the todo', (done) => {
    let hexId = todos[0]._id.toHexString();

    request(app)
    .patch(`/todos/${hexId}`)
    .send({text: 'test update', completed: true})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.text).toBe('test update');
      expect(typeof res.body.todo.completedAt).toBe('number');
    })
    .end (done);
  });

  it ('should clear completedAt when todo is not completed', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
    .patch(`/todos/${hexId}`)
    .send({text: 'reset update', completed: false})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.text).toBe('reset update');
      expect(res.body.todo.completedAt).toBeFalsy();
    })
    .end (done);
  });
});