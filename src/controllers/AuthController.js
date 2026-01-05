const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

/**
 * POST /api/auth/register
 * body: { name, email, password, role? }
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }

    const emailNormalized = String(email).toLowerCase().trim();

    const existing = await User.findOne({ email: emailNormalized });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Sécurité: on n'accepte que les rôles autorisés
    // (sinon quelqu’un peut s’inscrire en "admin" directement)
    const allowedRoles = ["citoyen", "agent", "admin"];
    const safeRole = role && allowedRoles.includes(role) ? role : "citoyen";

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = await User.create({
      name: String(name).trim(),
      email: emailNormalized,
      password: hashedPassword,
      role: safeRole
    });

    // Ne jamais renvoyer le password
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({ user: userObj });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /api/auth/login
 * body: { email, password }
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET not configured" });
    }

    const emailNormalized = String(email).toLowerCase().trim();

    const user = await User.findOne({ email: emailNormalized });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
