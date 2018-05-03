const main = require("express").Router();
const Product = require("../model/product");

function paginate(req, res, next) {
	const perPage = 9;
	const { page } = req.params;

	Product.find()
		.skip(perPage * (page - 1))
		.limit(perPage)
		.populate("category")
		.exec((error, products) => {
			if (error) return next(error);
			Product.count().exec((err, count) => {
				if (err) return next(err);
				res.render("main/products", {
					products,
					page: count / perPage,
					currPage: page
				});
			});
		});
}

main.get("/", (req, res, next) => {
	const { page } = req.params;
	if (page) {
		if (page === 1) {
			res.redirect("/page/1");
		} else {
			res.redirect(`/page/${page}`);
		}
	} else {
		res.redirect("/page/1");
	}
	paginate(req, res, next);
});

main.get("/page/:page", (req, res, next) => {
	paginate(req, res, next);
});

main.get("/products/:id", (req, res, next) => {
	Product.find({ category: req.params.id })
		.populate("category")
		.exec((error, products) => {
			if (error) return next(error);
			res.render("main/category", { products });
		});
});

main.get("/product/:id", (req, res, next) => {
	Product.findById(req.params.id, (error, product) => {
		if (error) return next(error);
		res.render("main/product", { product });
	});
});

module.exports = main;
