const mongoose = require('mongoose');

const today = new Date();

const Timestamp = mongoose.model('Date', {
	unix: {
		type: Number,
		trim: true,
		default: today.getTime(),
	},
	utc: {
		type: String,
		trim: true,
		default: today.toUTCString(),
	},
});

module.exports = Timestamp;
