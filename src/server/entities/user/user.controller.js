import User from './user.model';

export default class UserController {
    static async me(req, res) {
        const { userId } = req.session;

        const user = await User.findById(userId).lean();

        if (!user) {
            return res.status(404).json({ error: { message: 'User not found' } });
        }

        return res.json(user);
    }
}
