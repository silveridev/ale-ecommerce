const route = require("express").Router();
const User = require("../model/user");
const _ = require("lodash");
const waterfall = require("async/waterfall");
const passport = require("passport");
const Cart = require("../model/cart");
const { isAuthenticated } = require("../middleware");

route.get("/login", function(req, res) {
	if (req.user) return res.redirect("/");
	res.render("accounts/login", {
		message: req.flash("loginMessage")
	});
});

route.post(
	"/login",
	passport.authenticate("local-login", {
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true
	})
);

route.get("/profile", isAuthenticated, (req, res, next) => {
	waterfall([
		cb => {
			User.findById(req.user._id)
				.populate("history.item")
				.exec((error, user) => {
					if (error) return next(error);
					// res.render("accounts/profile", { user });
					cb(error, user);
				});
		},
		user => {
			if (user.userType === "admin") {
				User.find({ userType: "customer" }, (error, customers) => {
					res.render("accounts/profile", { user, customers });
				});
			} else {
				res.render("accounts/profile", { user });
			}
		}
	]);
});

route.get("/register", (req, res) => {
	res.render("accounts/register", {
		errors: req.flash("errors")
	});
});

route.post("/register", (req, res, next) => {
	waterfall([
		function(cb) {
			const user = new User();
			const { username, password, email } = _.pick(req.body, [
				"username",
				"password",
				"email"
			]);

			user.profile.picture = user.gravatar();

			if ((username, password, email)) {
				user.profile.name = username;
				user.password = password;
				user.email = email;

				User.findOne({ email }, (error, existingUser) => {
					if (existingUser) {
						req.flash(
							"errors",
							`Account with the email address ${email} already exists`
						);
						return res.redirect("/register");
					}
					user.save(error => {
						if (error) return next(error);
						cb(null, user);
					});
				});
			} else {
				res.status(400).json({
					success: false,
					message: "Username, password and email are all required"
				});
			}
		},

		function(user) {
			var cart = new Cart();
			cart.owner = user._id;
			cart.save(error => {
				if (error) next(error);
				req.logIn(user, function(err) {
					if (err) return next(err);
					res.redirect("/profile");
				});
			});
		}
	]);
});

route.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

route.get("/profile/edit", (req, res, next) => {
	res.render("accounts/profile-edit", { message: req.flash("success") });
});

route.post("/profile/edit", (req, res, next) => {
	User.findById(req.user._id, (error, user) => {
		if (error) return next(error);

		user.profile.name = req.body.username;
		user.address = req.body.address;

		user.save(error => {
			if (error) return next(error);
			req.flash("success", "Successfully updated your profile");
			return res.redirect("/profile");
		});
	});
});

module.exports = route;
