const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email) throw new Error("Missing fields");

        // Check if the user already exists in the database
        const user = await User.findOne({ where: { username: username } });

        if (user) return res.status(500).json({ message: "User Already Exists" });

        if (password.length < 6) return res.status(500).json({ message: "Password must bigger than 6 words" });
        // Hash the password before saving it to the database

        const hashedPassword = await bcrypt.hash(password, 12);

        const email = await User.findOne({ where: { email: email } });

        if (email) return res.status(500).json({ message: "User Already Exists" });

        if (!validateEmail(email)) return res.status(500).json({ message: "Please Enter a Validate Email" });

        const newUser = await User.create({ username, email, password: hashedPassword });

        await User.create({ username: username, password: hashedPassword, email: email });

        const token = await jwt.sign({ id: newUser._id, idAdmin: newUser.isAdmin }, "SECRET_KEY", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true }).status(201).json({
            token,
            newUser
        })

        return res.status(201).send();

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const login = async (req, res, next) => {
    const { password, email } = req.body;
    try {
        if (!username || !password || !email) throw new Error("Missing fields");

        // Check if the user already exists in the database
        const user = await User.findOne({ where: { username: username } });

        if (user) return res.status(500).json({ message: "User Already Exists" });

        if (password.length < 6) return res.status(500).json({ message: "Password must bigger than 6 words" });
        // Hash the password before saving it to the database

        const hashedPassword = await bcrypt.hash(password, 12);

        const email = await User.findOne({ where: { email: email } });

        if (email) return res.status(500).json({ message: "User Already Exists" });

        if (!validateEmail(email)) return res.status(500).json({ message: "Please Enter a Validate Email" });

        const newUser = await User.create({ username, email, password: hashedPassword });

        await User.create({ username: username, password: hashedPassword, email: email });

        const token = await jwt.sign({ id: newUser._id, idAdmin: newUser.isAdmin }, "SECRET_KEY", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true }).status(201).json({
            token,
            newUser
        })

        return res.status(201).send();

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}