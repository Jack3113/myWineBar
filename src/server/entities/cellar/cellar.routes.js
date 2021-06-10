import { Router } from 'express';

import CellarController from './cellar.controller';

const router = Router();

router.post('/', CellarController.create);
router.get('/mine', CellarController.getDefault);

export default router;
