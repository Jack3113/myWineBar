import Bottle from './bottle.model';
import Cellar from '../cellar/cellar.model';

import S3 from './../../tools/s3.tools';

export default class BottleController {
    static async create(req, res) {
        try {
            const { userId } = req.session;
            const { cellar } = req.body;

            if (cellar) {
                const authorized = await Cellar.exists({
                    _id: req.body.cellar,
                    $or: [{ creator: userId }, { owners: userId }],
                });
                if (!authorized) {
                    return res.sendStatus(403);
                }
            } else {
                const defaultCellar = await Cellar.findOne({ creator: userId, isDefault: true });
                if (defaultCellar) {
                    req.body.cellar = defaultCellar;
                } else {
                    return res.sendStatus(500);
                }
            }

            const bottle = new Bottle(req.body);
            bottle.createdBy = userId;
            await bottle.save();

            return res.json(bottle);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e });
        }
    }

    static async getURLUploadImage(req, res) {
        try {
            const { key } = req.params;

            const s3 = new S3();
            const url = await s3.createPresignedPost('bottles', key);
            return res.json(url);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e });
        }
    }
}
