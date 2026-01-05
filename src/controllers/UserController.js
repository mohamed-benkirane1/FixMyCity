const mongoose = require('mongoose');
const User = require('../models/UserModel');

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body || {};
		if (!name || !email || !password) {
			return res.status(400).json({ error: 'name, email and password are required' });
		}

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const user = new User({ name, email, password });
		await user.save();
		const userObj = user.toObject();
		delete userObj.password;
		return res.status(201).json({ user: userObj });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password');
		return res.status(200).json({ users });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'Invalid id' });
		}
		const user = await User.findById(id).select('-password');
		if (!user) return res.status(404).json({ error: 'User not found' });
		return res.status(200).json({ user });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'Invalid id' });
		}
		const updates = { ...req.body };
		delete updates._id;
		const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password');
		if (!user) return res.status(404).json({ error: 'User not found' });
		return res.status(200).json({ user });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: 'Invalid id' });
		}
		const user = await User.findByIdAndDelete(id);
		if (!user) return res.status(404).json({ error: 'User not found' });
		return res.status(200).json({ message: 'User deleted' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser
};
