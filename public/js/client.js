(function($) {
	function searchProduct(item) {
		$.ajax({
			method: "POST",
			url: "/api/search?search=" + item
		})
			.done(function(data) {
				if (typeof data.products === "undefined") {
					location.reload(true);
				} else {
					console.info("success", data);
					$("#search_result").empty();
					$("#pagination").hide();
					for (var i = 0; i < data.products.length; i++) {
						appendProduct(data.products[i]);
					}
				}
			})
			.fail(function(error) {
				console.error("Error", error);
			});
	}

	$("#serach_item").keyup(function() {
		var searchItem = $(this).val();
		if (searchItem.length > 0) {
			searchProduct(searchItem);
		}
	});

	$("#search_btn").click(function() {
		var searchItem = $("#serach_item").val();
		if (searchItem.length > 0) {
			searchProduct(searchItem);
		}
	});

	function appendProduct(product) {
		var html =
			'<div class="col-md-4 mb-3"><div class="card"><img class="card-img-top" src="';
		html +=
			"https://imgplaceholder.com/330x300/2b3e50/ffffff/fa-file-image-o?font-size=88";
		html +=
			'" alt="Card image cap"><div class="card-body"><h5 class="card-title">';
		html += product.name;
		html += '</h5><p class="card-text">';
		html += product.price;
		html += ' €</p><a href="/product/';
		html += product._id;
		html += '" class="btn btn-primary">Details</a></div></div></div>';

		$("#search_result").append(html);
	}

	$("#plus").on("click", function(e) {
		e.preventDefault();

		var max = parseInt($("#inventory").val());

		var quantity = parseInt($("#quantity").val());
		quantity += 1;

		if (quantity <= max) {
			$("#quantity").val(quantity);
			$("#total").html(quantity);
			$("#totalHidden").val(quantity * $("#product_price").val());
		} else {
			$(".not-enough").text("Not enough items in the store");
		}
	});

	$("#minus").on("click", function(e) {
		e.preventDefault();

		$(".not-enough").text("");

		var quantity = parseInt($("#quantity").val());
		if (quantity > 1) {
			quantity -= 1;

			$("#quantity").val(quantity);
			$("#total").html(quantity);
			$("#totalHidden").val(quantity * $("#product_price").val());
		}
	});

	// $("#overlay").on("click", function() {
	// 	$(this).hide();
	// });

	$("#add_category").submit(function(e) {
		e.preventDefault();

		$("#overlay").show();

		var categoryName = $("#category_name").val();

		$.ajax({
			method: "POST",
			url: "/admin/category/add",
			data: { categoryName: categoryName }
		})
			.done(function() {
				location.reload(true);
			})
			.fail(function(error) {
				$("#overlay").hide();
				console.log("Error happended: ", error);
			});
	});

	$("#add-a-product").submit(function(e) {
		e.preventDefault();
		$("#overlay").show();

		var productName = $("#add_product_name")
			.val()
			.trim();
		var productPrice = parseFloat($("#add_product_price").val());
		var inventory = parseInt($("#inventory").val());
		var category = $("select#categories option:checked").val();

		$.ajax({
			method: "POST",
			url: "/admin/product/add",
			data: {
				name: productName,
				price: productPrice,
				inventory: inventory,
				categoryId: category
			}
		})
			.done(function() {
				var origin = window.location.origin;
				window.location.href = origin + "/";
			})
			.fail(function(error) {
				$("#overlay").hide();
				console.log("Error happended: ", error);
			});
	});

	$("#edit-a-product").submit(function(e) {
		e.preventDefault();
		$("#overlay").show();

		var productName = $("#add_product_name")
			.val()
			.trim();
		var productPrice = parseFloat($("#add_product_price").val());
		var inventory = parseInt($("#inventory").val());
		var category = $("select#categories option:checked").val();
		var productId = $("input#product_id").val();

		$.ajax({
			method: "POST",
			url: "/admin/product/edit",
			data: {
				name: productName,
				price: productPrice,
				inventory: inventory,
				categoryId: category,
				id: productId
			}
		})
			.done(function() {
				var origin = window.location.origin;
				window.location.href = origin + "/product/" + productId;
			})
			.fail(function(error) {
				$("#overlay").hide();
				console.log("Error happended: ", error);
			});
	});
})(jQuery);
