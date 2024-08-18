import express, { Router } from 'express';
import generalController from '../controllers/general.controller'

const router: Router = express.Router();

router.get('/', generalController.welcome)

export default router
