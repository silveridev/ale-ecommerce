const main = require('express').Router();

main.get("/", (req, res) => {
	res.render('main/home');
});

module.exports = main;
