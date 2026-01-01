const database = require("../db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
       let { name, email, password } = req.body;
       email = email.trim().toLowerCase();
       password = password.trim();

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
  try {
    let { email, password } = req.body;
     email = email.trim().toLowerCase();
      password = password.trim();

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }


    const [user] = await database.query(
      "SELECT id, name, email, password FROM auth WHERE email = ?",
      [email]
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
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
      }
    

    });

  } catch (error) {
    res.status(500).json({ message: "Login error: " + error.message });
  }
};

    const getProfile = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "User id required" });

    const [user] = await database.query(
      "SELECT id, name, email FROM auth WHERE id = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: user[0] });

  } catch (error) {
    res.status(500).json({ message: "Profile error: " + error.message });
  }
};




module.exports = { register, login,getProfile };
