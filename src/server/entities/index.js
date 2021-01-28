import { Router } from 'express';

import { authenticatedRoute } from '../tools/security.tools';

import userRoutes from './user/user.routes';
import authRoutes from './auth/auth.routes';

const router = Router();

router.get('/health', (req, res) =>
    res.status(200).json({
        version: process.env.npm_package_version,
        status: 'OK',
    }),
);

router.use('/v1/auth', authRoutes);
router.use('/v1/user', authenticatedRoute, userRoutes);

export default router;
