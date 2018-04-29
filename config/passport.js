const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/user");

// serialize and deserialize
passport.serializeUser(function(user, done) {
	return done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, (err, user) => {
		return done(err, user);
	});
});

// middleware
passport.use(
	"local-login",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		(req, email, password, done) => {
			User.findOne({ email }, (err, user) => {
				if (err) return done(err);

				if (!user)
					return done(null, false, { loginMessage: "No user has been found" });

				if (!user.comparePassword(password))
					return done(
						null,
						false,
						req.flash("loginMessage", "Oops! Wrong password!")
					);

				return done(null, user);
			});
		}
	)
);

// custom function t validate
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redicrect("/login");
};
