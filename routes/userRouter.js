import { Router } from 'express';
import userController from "../controller/userController.js"

Router.get('/users', userController.userList);
Router.get('/users/:userId', userController.singleUser);
Router.post('/signup', userController.signup);
Router.post('/login', userController.login);
Router.post('/logout', userController.logout);
Router.get('/auth', userController.auth);
Router.put('/profile/:id', userController.profile);
Router.delete ('/delete/:id', userController.deleteProfile);

module.exports = userRouter;