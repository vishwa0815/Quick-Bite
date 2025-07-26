const userauthenticationModel = require('../models/userauthentication.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailer');


const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ sucess: false, message: "missing details" });
    }

    try {
        const existingUser = await userauthenticationModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User Already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userauthenticationModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Food Delivery App',
            text: `Welcome to Food Delivery Website. Your account has been created with ${email}`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Mail sent successfully");
        } catch (error) {
            console.error("Error sending mail:", error.message);
        }

        return res.json({ success: true, token: token })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password is required' })
    }

    try {
        const user = await userauthenticationModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ sucess: false, message: 'Invalid Password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,                // must be false in dev if not using HTTPS
            sameSite: 'strict',           // or 'lax'
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: 'Successful Login' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({ success: true, message: 'User Logout' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const getprofile = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userauthenticationModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.error('Error in getprofile:', error);
        return res.status(401).json({ success: false, message: 'Invalid token or server error' });
    }
};


module.exports = { register, login, logout, getprofile };

