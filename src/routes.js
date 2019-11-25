//Controllers
const AuthController = require('./app/controllers/auth/AuthController');
const UserController = require('./app/controllers/UserController');
const StoryController = require('./app/controllers/StoryController');
//Middlewares
const auth = require('./app/middlewares/Auth');

module.exports = app => {

    app.post('/login', AuthController.signIn);

    app.route('/users')
       .get(UserController.index)
       .post(UserController.store);
    
    app.route('/stories')
       .all(auth)
       .get(StoryController.index)
       .post(StoryController.store);
      
   app.route('/stories/:id')
      .all(auth)
      .get(StoryController.show)
      .patch(StoryController.update)
      .delete(StoryController.delete);
    
}