import { Router } from 'express';
import userController from "../controller/userController.js"

const router = Router();

router.get('/users', userController.userList);
router.get('/users/:userId', userController.singleUser);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/auth', userController.auth);
router.put('/profile/:id', userController.profile);
router.delete ('/delete/:id', userController.deleteProfile);

export default router;