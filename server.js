const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const config = require("./config");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
require("./config/passport");
const Category = require("./model/category");
const totalItemInCart = require("./middleware").totalItemInCart;

const userRoutes = require("./routes/user");
const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");
const api = require("./api/api");

const app = express();
mongoose.connect(config.db, err => {
	if (err) {
		console.error(err);
	} else {
		console.log("Connected to the database");
	}
});

//middleware
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(
	session({
		secret: config.secretKey,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 3 * 60 * 60 * 1000,
			expires: new Date(Date.now() + 3 * 60 * 60 * 1000)
		},
		store: new MongoStore({ url: config.db, autoReconnect: true })
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
	app.locals.user = req.user;
	next();
});

app.use((req, res, next) => {
	Category.find({}, (error, categories) => {
		if (error) return next(error);
		res.locals.categories = categories;
		next();
	});
});

app.use(totalItemInCart);

// routes
app.use(mainRoutes);
app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use("/api", api);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running on port 3000"));
