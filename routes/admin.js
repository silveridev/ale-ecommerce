const route = require("express").Router();
const Category = require("../model/category");

route.get("/category/add", (req, res) => {
	res.render("admin/category-add", { message: req.flash("success") });
});

route.post("/category/add", (req, res, next) => {
	const category = new Category();
	category.name = req.body.categoryName;

	category.save(error => {
		if (error) return next(error);
		req.flash("success", "Successfully added a category");
		res.redirect("/admin/category/add");
	});
});

module.exports = route;
