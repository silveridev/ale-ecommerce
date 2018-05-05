const main = require("express").Router();
const Product = require("../model/product");
const Cart = require("../model/cart");
const stripe = require("stripe")("sk_test_41L0gRe94OSsJLRQHBBZIFHF");
const waterfall = require("async/waterfall");
const User = require("../model/user");
const moment = require("moment");

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
	console.log("req.isAuthenticated: ", req.isAuthenticated());
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
					price: parseFloat(req.body.price),
					quantity: req.body.quantity && parseInt(req.body.quantity)
				});
				cart.totoal = cart.totoal + parseFloat(req.body.totalMoney);

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

		foundCart.totoal = foundCart.totoal - parseFloat(req.body.price).toFixed(2);
		foundCart.save((err, found) => {
			if (err) next(err);
			req.flash("remove", "Successfully removed");
			res.redirect("/cart");
		});
	});
});

main.post("/payment", (req, res, next) => {
	let stripeToken = req.body.stripeToken;
	let currentCharges = Math.round(req.body.stripeMoney * 100);
	stripe.customers
		.create({
			source: stripeToken
		})
		.then(customer => {
			return stripe.charges.create({
				amount: currentCharges,
				currency: "eur",
				customer: customer.id
			});
		})
		.then(charge => {
			waterfall([
				function(cb) {
					Cart.findOne({ owner: req.user.id }, function(error, cart) {
						cb(error, cart);
					});
				},
				function(cart, cb) {
					User.findOne({ _id: req.user._id }, (err, user) => {
						if (user) {
							for (var i = 0; i < cart.items.length; i++) {
								user.history.push({
									item: cart.items[i].item,
									paid: cart.totoal,
									date: moment(Date.now()).format("MMMM Do YYYY, H:mm")
								});
							}
							user.save((err, user) => {
								if (err) return next(err);
								cb(err, user);
							});
						}
					});
				},
				function(user) {
					Cart.update(
						{ owner: user._id },
						{ $set: { items: [], totoal: 0 } },
						(error, updated) => {
							if (updated) {
								res.redirect("/profile");
							}
						}
					);
				}
			]);
		});
});

module.exports = main;
