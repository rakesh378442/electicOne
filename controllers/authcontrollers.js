const database = require("../db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const [user] = await database.query(
            "SELECT * FROM auth WHERE email = ?",
            [email]
        );

        if (user.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await database.query(
            "INSERT INTO auth (name, email, password) VALUES (?,?,?)",
            [name, email, hashedPassword]
        );

        res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Register error: " + error });
    }
};

const login = async (req, res) => {
     // const { email, password } = req.body;

    try {
     const { email, password } = req.body;
        console.log(email,password);

        if (!email || !password) {
            return res.status(400).json({ message: "Email & password required" });
        }

        const [user] = await database.query(
            "SELECT * FROM auth WHERE email = ? AND password = ?",
            [email, password]
        );

        if (user.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user[0].password);

        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login success",
            user: user[0]
        });

    } catch (error) {
        res.status(500).json({ message: "Login error: " + error });
    }
};

module.exports = { register, login };
