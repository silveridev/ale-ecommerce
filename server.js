const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');

const User = require('./model/user');

const app = express();
mongoose.connect('mongodb://root:aledev@ds161939.mlab.com:61939/ecommerce', (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log("Connected to the database");
	}
})

//middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// routes
app.get("/", (req, res) => {
	res.render('main/home');
});

app.post('/register', (req, res, next) => {
	const user = new User();
	const { username, password, email } = _.pick(req.body, ['username', 'password', 'email']);

	if (username, password, email) {
		user.profile.name = username;
		user.password = password;
		user.email = email;

		user.save(error => {
			if (error) return next(error);
			res.status(200).json({ success: true, message: "User has been successfully created." });
		})
	} else {
		res.status(400).json({ success: false, message: 'Username, password and email are all required' });
	}
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running on port 3000"));



