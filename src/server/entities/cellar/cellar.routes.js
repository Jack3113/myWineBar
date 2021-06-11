import { Router } from 'express';

import CellarController from './cellar.controller';

const router = Router();

router.route('/').post(CellarController.create).get(CellarController.getDefault);
router.route('/shared').get(CellarController.getShared);

export default router;
