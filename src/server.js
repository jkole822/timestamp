const express = require('express');
const path = require('path');
// const cors = require('cors');
const Timestamp = require('./models/timestamp');

const app = express();

// app.use(cors({ optionSuccessStatus: 200 }));

const publicDirectoryPath = path.join(__dirname, '../public');
const fccIndexPath = path.join(__dirname, '../views/index.html');

app.use(express.static(publicDirectoryPath));
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(fccIndexPath);
});

Date.prototype.isValid = function () {
	// An invalid date object returns NaN for getTime() and NaN is the only
	// object not strictly equal to itself.
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
		res.status(400).send({ error: 'Invalid Date' });
	}
});

// var listener = app.listen(process.env.PORT, function () {
// 	console.log('Your app is listening on port ' + listener.address().port);
// });

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
