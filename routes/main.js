const main = require("express").Router();
const Product = require("../model/product");
const Cart = require("../model/cart");

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

main.post("/product/:product_id", (req, res, next) => {
	if (req.user) {
		try {
			Cart.findOne({ owner: req.user._id }, function(error, cart) {
				cart.items.push({
					item: req.body.id,
					price: parseInt(req.body.price),
					quantity: req.body.quantity && parseInt(req.body.quantity)
				});

				cart.total = (cart.total * parseFloat(req.body.price)).toFixed(2);

				cart.save(err => {
					if (err) return next(err);
					return res.redirect("/cart");
				});
			});
		} catch (error) {
			console.error("Could not find the cart, Error: ", error);
		}
	} else {
		res.redirect("/login");
	}
});

main.get("/cart", (req, res, next) => {
	Cart.findOne({ owner: req.user._id })
		.populate("items.item")
		.exec((error, foundCart) => {
			if (error) next(error);
			res.render("cart", {
				userCart: foundCart
			});
		});
});

main.post("/cart/remove", (req, res, next) => {
	Cart.findOne({ owner: req.user._id }, (error, foundCart) => {
		foundCart.items.pull(String(req.body.item));

		foundCart.total = foundCart.total = parseFloat(req.body.price).toFixed(2);
		foundCart.save((err, found) => {
			if (err) next(err);
			req.flash("remove", "Successfully removed");
			res.redirect("/cart");
		});
	});
});

module.exports = main;
