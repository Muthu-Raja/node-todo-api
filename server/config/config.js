let env = process.env.NODE_ENV || "development";
console.log('env ******', env);

if(env === 'development' || env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = env === 'development'? 'mongodb://localhost:27017/TodoApp' : 'mongodb://localhost:27017/TodoAppTest';
} 