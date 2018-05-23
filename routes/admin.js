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
		"inventory",
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

admin.post("/product/edit", adminRoute, (req, res, next) => {
	const { name, price, categoryId, inventory, id } = _.pick(req.body, [
		"name",
		"price",
		"inventory",
		"categoryId",
		"id"
	]);

	Product.findById(id, function(error, product) {
		product.name = name;
		product.price = price;
		product.category = categoryId;
		product.inventory = inventory;

		product.save((error, product) => {
			if (error) return next(error);
			res.redirect("/");
		});
	});
});

admin.get("/product/edit/:id", adminRoute, (req, res, next) => {
	Category.find({}, (error, categories) => {
		if (error) return next(error);
		Product.findById(req.params.id, function(error, product) {
			res.render("admin/edit-product", { product, categories });
		});
	});
});

module.exports = admin;
