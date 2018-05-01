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

route.post("/search", (req, res, next) => {
	const { search } = req.query;
	const notFoundMessage = "Product not found";
	if (search) {
		Product.search(search, function(err, products) {
			if (err) res.json({ success: false, error: err });
			res.json({ success: true, products });
		});
	} else {
		res.json({ success: true, message: notFoundMessage });
	}
});

module.exports = route;
