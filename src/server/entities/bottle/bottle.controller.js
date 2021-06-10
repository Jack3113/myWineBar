import Bottle from './bottle.model';
import Cellar from '../cellar/cellar.model';

export default class BottleController {
    static async create(req, res) {
        try {
            const { userId } = req.session;
            const { cellar } = req.body;

            if (cellar) {
                const authorized = await Cellar.exists({
                    _id: req.body.cellar,
                    $or: [{ creator: userId }, { owners: { $in: [userId] } }],
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
}
