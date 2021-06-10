import { checkPassword, generateToken } from '../../tools/security.tools';
import User from '../user/user.model';

export default class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (email) {
                const user = await User.findOne({ email }).select('+password');

                if (user && checkPassword(password, user.password)) {
                    const token = generateToken({ id: user._id });
                    return res.json({ token });
                }
            }
            return res.status(403).json({ error: { message: 'Wrong credentials' } });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e });
        }
    }

    static async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!password) {
                return res.status(400).json({ error: { message: 'Missing password' } });
            }
            if (!email) {
                return res.status(400).json({ error: { message: 'Missing email' } });
            }

            const user = new User({ name, email, password });
            await user.save();

            const createdUser = await User.findById(user._id).lean();

            return res.json(createdUser);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: e });
        }
    }
}
