const admin = require("express").Router();
const Category = require("../model/category");
const { adminRoute } = require("../middleware");
const Product = require("../model/product");
const { waterfall } = require("async");
const _ = require("lodash");

admin.get("/category/add", (req, res) => {
	res.render("admin/category-add", { message: req.flash("success") });
});

admin.post("/category/add", (req, res, next) => {
	const category = new Category();
	category.name = req.body.categoryName;

	category.save(error => {
		if (error) return next(error);
		req.flash("success", "Successfully added a category");
		res.redirect("/admin/category/add");
	});
});

admin.get("/product/add", adminRoute, (req, res, next) => {
	Category.find({}, (error, categories) => {
		if (error) return next(error);
		res.render("admin/add-product", { categories });
	});
});

admin.post("/product/add", adminRoute, (req, res, next) => {
	const { name, price, categoryId, inventory } = _.pick(req.body, [
		"name",
		"price",
		"categoryId"
	]);

	const product = new Product();

	product.name = name;
	product.price = price;
	product.category = categoryId;
	product.inventory = inventory;

	product.save((error, product) => {
		if (error) return next(error);
		res.redirect("/");
	});
});

module.exports = admin;
