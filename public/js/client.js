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
		html += product.image;
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
})(jQuery);
