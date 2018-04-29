const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: { type: String, required: true },
	address: String,
	profile: {
		name: { type: String, default: "" },
		picture: { type: String, defalut: "" }
	},
	history: {
		date: Date,
		paid: { type: Number, defalut: 0 }
	},
	updated: { type: Date, default: Date.now },
	userType: { type: String, default: "customer" }
});

// Hash the password before we even save it to the database;
UserSchema.pre("save", function(next) {
	const user = this;
	if (!user.isModified("password")) return next();

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, (error, hash) => {
			if (error) return next(error);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(password) {
	const user = this;
	return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.gravatar = function(size) {
	if (!this.size) size = size || 400;
	if (!this.email) return "https://gravatar.com/avatar/?s" + size + "&d=retro";
	var md5 = crypto
		.createHash("md5")
		.update(this.email)
		.digest("hex");
	return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&dretro";
};

module.exports = mongoose.model("User", UserSchema);
