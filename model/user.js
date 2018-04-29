const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
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
		name: { type: String, default: '' },
		picture: { type: String, defalut: '' }
	},
	history: {
		date: Date,
		paid: { type: Number, defalut: 0 }
	}
});

// Hash the password before we even save it to the database;
UserSchema.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, (error, hash) => {
			if (error) return next(error);
			user.password = hash;
			next();
		})
	})
});

UserSchema.methods.comparePassword = function(password) {
	const user = this;
	return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);