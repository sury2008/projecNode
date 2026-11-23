import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { AppError } from '../utils/AppError.js';
import { createToken } from "../utils/jwt.js";

export const register = async (req, res) => {
    const { username, password, address, phone } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new AppError("username already exists", 409, "conflict");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, address, phone });
    await user.save();

    const token = generateToken(user);

    return res.status(201).json({
        user: { _id: user._id, username, address, phone },
        token,
    });
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
        throw new AppError("invalid username or password", 401, "unauthorized");
    }

    const token = generateToken(user);

    return res.json({
        user: { _id: user._id, username: user.username, address: user.address, phone: user.phone },
        token,
    });
};