// MOBILE JS

$(function(){
	initCarousel();
});

function initCarousel() {
	$(".b-carousel").each(function(index){
		var $carousel = $(this),
			id = "carousel_" + index;
			
		if (!$carousel.is(".b-carousel_ready") && $carousel.is(":visible")) {
			$carousel.attr("id", id);
			
			if (!$carousel.closest(".b-carousel-wrapper").length) {
				$carousel.wrap('<div class="b-carousel-wrapper"></div>');
				
				$carousel.after('<div class="b-carousel-arrow b-carousel-arrow_right" id="' + id + '_right"></div>');
				$carousel.after('<div class="b-carousel-arrow b-carousel-arrow_left" id="' + id + '_left"></div>');
			}
			
			$carousel.find("li").addClass("b-carousel__item");
			$carousel.addClass("b-carousel_ready");
			
			$carousel.carouFredSel({
				responsive: true,
				auto: false,
				prev: "#" + id + "_left",
				next: "#" + id + "_right",
				items: {
					visible: 1,
					width: 747,
					height: (660/980*100) + '%'
				}
			});
		}
	});
}