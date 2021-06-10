import Cellar from './cellar.model';

export default class CellarController {
    static async create(req, res) {
        try {
            const { userId } = req.session;
            const { name, isDefault } = req.body;

            if (!name) {
                return res.sendStatus(500);
            }

            let _isDefault = Boolean(isDefault);
            if (!req.body.hasOwnProperty('isDefault')) {
                _isDefault = true;
            }

            const newCellar = new Cellar({ name, creator: userId, isDefault: _isDefault });
            await newCellar.save();

            return res.json(newCellar);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e });
        }
    }

    static async getDefault(req, res) {
        try {
            const { userId } = req.session;

            const cellar = await Cellar.find({ owner: userId, isDefault: true })
                .populate('bottles')
                .lean({ virtuals: true });

            if (!cellar) {
                return res.status(404).json({ error: { message: 'Cellar not found' } });
            }

            return res.json(cellar);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e });
        }
    }
}
