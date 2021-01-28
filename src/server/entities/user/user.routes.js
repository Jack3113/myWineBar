import { Router } from 'express';

import UserController from './user.controller';

const router = Router();

router.get('/me', UserController.me);

export default router;
