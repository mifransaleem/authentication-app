import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/authMiddleware.js';
// Route Level Middleware - To Protect Route
router.use('/logout', checkUserAuth);
// Public Routes
router.post('/register', userController.userRegistration);
router.post('/login', userController.userLogin);
// Protected Routes
router.post('/logout', userController.userLogout);
export default router;
