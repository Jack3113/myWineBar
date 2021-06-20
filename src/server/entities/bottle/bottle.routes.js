import { Router } from 'express';

import BottleController from './bottle.controller';

const router = Router();

router.post('/', BottleController.create);
router.get('/uploadImage/:key', BottleController.getURLUploadImage);

export default router;
