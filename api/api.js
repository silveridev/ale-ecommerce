const route = require("express").Router();
const async = require("async");
const faker = require("faker");
const Category = require("../model/category");
const Product = require("../model/product");

route.get("/:name", (req, res, next) => {
	async.waterfall([
		function(callback) {
			Category.findOne({ name: req.params.name }, (error, category) => {
				if (error) return next(error);
				callback(null, category);
			});
		},
		function(category) {
			console.log(category);
			for (let i = 0; i < 30; i++) {
				var product = new Product();
				product.category = category._id;
				product.name = faker.commerce.productName();
				product.price = faker.commerce.price();
				product.image = faker.image.image();

				product.save();
			}
		}
	]);

	res.json({ message: "Success" });
});

module.exports = route;
