import express, { Router } from 'express';
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.post('/purchase-premium', authMiddleware.verifyToken, userController.purchasePremium)

router.get('/random-match', authMiddleware.verifyToken, userController.getRandomMatch)
router.post('/random-match/action', authMiddleware.verifyToken, userController.randomMatchAction)

export default router
