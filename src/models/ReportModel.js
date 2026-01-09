const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	location: { type: String, default: '' },
	image: { type: String, default: '' },
	latitude: { type: Number },
	longitude: { type: Number },
	status: { type: String, enum: ['recu', 'en_cours', 'resolu'], default: 'recu' },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
