import { Router } from 'express';

import CellarController from './cellar.controller';

const router = Router();

router.route('/').post(CellarController.create).get(CellarController.getDefault);

export default router;
