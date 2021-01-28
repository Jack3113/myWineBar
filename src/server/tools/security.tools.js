import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import configuration from '../configuration';

export function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export function checkPassword(password, hash) {
    console.log(password, hash, bcrypt.compareSync(password, hash));
    return bcrypt.compareSync(password, hash);
}

export function generateToken(payload) {
    return jwt.sign(payload, configuration.jwtSecret, { expiresIn: '7d' });
}

export function verifyToken(token) {
    return jwt.verify(token, configuration.jwtSecret);
}

export function authenticatedRoute(req, res, next) {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        return res.status(401).json({ error: { message: 'Authorization header is missing' } });
    }

    const [header, token] = authorizationHeader.split(' ');
    if (token) {
        console.log({ token });
        const payload = verifyToken(token);
        console.log({ payload });
        if (payload.id) {
            req.session.userId = payload.id;
            return next();
        }
    }
    return res.sendStatus(403);
}
