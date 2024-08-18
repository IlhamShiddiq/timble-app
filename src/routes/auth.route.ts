import express, { Router } from 'express';
import authController from '../controllers/auth.controller'

const router: Router = express.Router();

router.post('/sign-up', authController.signUp)
router.post('/login', authController.login)

export default router
