const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	category: { tyep: mongoose.Schema.Types.ObjectId, ref: "Category" },
	name: String,
	price: Number,
	image: String
});

module.exports = mongoose.model("Product", ProductSchema);
