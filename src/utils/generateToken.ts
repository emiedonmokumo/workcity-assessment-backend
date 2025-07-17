import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';


const generateToken = (user: IUser): string => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
    );
};

export default generateToken