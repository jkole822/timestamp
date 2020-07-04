const express = require('express');
const path = require('path');
const cors = require('cors');
const Timestamp = require('./models/timestamp');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const fccIndexPath = path.join(__dirname, '../views/index.html');

app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static(publicDirectoryPath));

app.get('/', function (req, res) {
	res.sendFile(fccIndexPath);
});

Date.prototype.isValid = function () {
	return this.getTime() === this.getTime();
};

app.get('/api/timestamp', (req, res) => {
	const timestamp = new Timestamp();

	try {
		res.send(timestamp);
	} catch (e) {
		res.status(404).send();
	}
});

app.get('/api/timestamp/:date_string', (req, res) => {
	const dateString = req.params.date_string;
	let timestamp = {};

	try {
		if (!dateString.match(/[^0-9]+/)) {
			const unix = parseInt(dateString);
			const date = new Date(unix);
			if (!date.isValid()) {
				throw new Error();
			}
			const utc = date.toUTCString();
			timestamp = new Timestamp({ unix, utc });
		} else if (dateString.match(/[^0-9]+/)) {
			const date = new Date(dateString);
			if (!date.isValid()) {
				throw new Error();
			}
			const unix = date.getTime();
			const utc = date.toUTCString();
			timestamp = new Timestamp({ unix, utc });
		}

		res.send(timestamp);
	} catch (e) {
		res.status(400).json({ error: 'Invalid Date' });
	}
});

app.listen(port, () => {
	console.log('Your app is listening on port ' + port);
});
