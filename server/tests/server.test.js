const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Before every test case, remove all documents from the given collection
beforeEach((done) => {
  Todo.deleteMany({}).then(() => done()); 
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

        Todo.find().then((todos) => {
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
        expect(todos.length).toBe(0);
        done();
      }).catch((err) => {
        done(err);
      });
      
    });
  });

});
