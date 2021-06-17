import { Router } from 'express';

import CellarController from './cellar.controller';

const router = Router();

router.route('/').post(CellarController.create).get(CellarController.getDefault);
router.route('/shared').get(CellarController.getShared);
router.route('/list').get(CellarController.getAll);
router.route('/:id').get(CellarController.getById);

export default router;
