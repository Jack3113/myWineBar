import { Router } from 'express';

import BottleController from './bottle.controller';

const router = Router();

router.post('/', BottleController.create);

export default router;
