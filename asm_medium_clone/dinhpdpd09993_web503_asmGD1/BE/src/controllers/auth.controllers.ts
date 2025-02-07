import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import config from '../config/config';

export const register = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { email, password, name } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({ email, password, name });
        await user.save();

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRE
        });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRE
        });

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
