// MAIN JavaScript

$(function(){
	// VIDEO
	video = document.getElementById("firstPageVideo");
	if (video.paused != undefined) {
		video.play();
	}
	
	// ABOUT PROJECT
	$(".b-about-project .b-button").click(function(){
		$(".b-about-project").fadeOut(1000);
		runAnimationBlock($(".b-sections"));
	});
	
	// SECTIONS
	$(".b-sections__item .b-button").click(function() {
		var elSectionItem = $(this).closest(".b-sections__item"),
			sectionCode = elSectionItem.data("section-code");
			
		switch(sectionCode) {
			case "video":
			case "info":
				setArticleUrl(sectionCode);
			break;
			default:
				if (sectionCode) {
					showPoints(sectionCode);
					$(".b-main").addClass("b-main_ready");
				}
			break;
		}
	});
	
	$(".b-sections__item .b-small-icon").click(function(){
		var elSectionItem = $(this).closest(".b-sections__item"),
			sectionCode = elSectionItem.data("section-code");
		
		switch(sectionCode) {
			case "video":
			case "info":
				setArticleUrl(sectionCode);
			break;
			default:
				if (sectionCode) {
					showPoints(sectionCode);
				}
			break;
		}
	});
	
	// TOOLTIP
	var toolTipTimeOut;
	$(".b-sections__item .b-small-icon").hover(function(){
		var	sizeItems = $(".b-sections__item").size(),
			elItem = $(this).closest(".b-sections__item"),
			indexItem = elItem.index(),
			widthItem = elItem.width(),
			posLeft = elItem.offset().left,
			posRight = "auto",
			elTooltip = $(".b-sections__tooltip"),
			tooltipWidth = elTooltip.width() + 10,
			title = elItem.find(".b-icon__text").text(),
			text = elItem.find(".b-text__cell").html(),
			elArrowLeft = elTooltip.find(".b-sections__tooltip__arrow"),
			elArrowLeftWidth = elArrowLeft.width();
			elArrowLeftPos = widthItem/2 - elArrowLeftWidth/2,
			mapFill = $(".b-map__fill");
		
		mapFill.stop();
		
		if (indexItem == 0) {
			posLeft = 0;
		} else if (indexItem == (sizeItems-1)) {
			posLeft = "auto",
			posRight = 0;
			elArrowLeftPos = (tooltipWidth - widthItem) + widthItem/2 - elArrowLeftWidth/2;
		} else {
			posLeft -= tooltipWidth/2 - widthItem/2;
			elArrowLeftPos += tooltipWidth/2 - widthItem/2;
		}
		
		elTooltip.find(".b-sections__tooltip__title").text(title);
		elTooltip.find(".b-sections__tooltip__text").html(text);
		elArrowLeft.css({
			left: elArrowLeftPos
		});
		
		elTooltip.css({
			left: posLeft,
			right: posRight
		}).addClass("active");
		
		mapFill.fadeIn();
		
	}, function() {
		var elTooltip = $(".b-sections__tooltip"),
			mapFill = $(".b-map__fill");
		
		mapFill.stop();
		
		elTooltip.removeClass("active");
		mapFill.fadeOut();
	});
	
	// ARTICLE PAGE
	$(".b-article-page__back").click(function(){
		//hideArticle();
		window.location.hash = "";
	});
	
	checkArticleUrl(true);
});

$(window).on("hashchange", function(){
	var hash = window.location.hash;
	checkArticleUrl(false);
});

$(window).scroll(function(){
	var height = $(".b-first-page").height(),
		scrollTop = $(window).scrollTop(),
		top = height/4;
		
	if (scrollTop > top) {
		
		var video = document.getElementById("firstPageVideo");
		if (video.paused != undefined) {
			video.pause();
		}
		
		$(".b-first-page").animate({
			top: "-100%"
		}, 800);
		
		$(".b-map-page").css({
			top: "0"
		});
	}
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

function parseGetParams(href){ 
	if (!href) {
		return "";
	}
	
	var __GET = href.split("&"); 
	var $_GET = new Array(__GET.length); 
	for(var i=0; i<__GET.length; i++) { 
		var getVar = __GET[i].split("=");
		var val = typeof(getVar[1])=="undefined" ? "" : getVar[1];
		$_GET[i] = { name: getVar[0], val: val }; 
	} 
	return $_GET; 
}

function setArticleUrl(articleID) {
	window.location = "#articleID=" + articleID;
}

function checkArticleUrl(onDocReady) {
	var hash = window.location.hash;
	
	if (hash && hash != "#") {
		
		var params_ready = window.location.hash.split("#")[1],
			urlParams = parseGetParams(params_ready);
		
		for (i in urlParams) {
			var name = urlParams[i]["name"],
				val = urlParams[i]["val"];
				
			if (name == "articleID" && val) {
				if (!onDocReady) {
					showArticle(val, true);
				} else {
					$(".b-main").addClass("b-main_ready");
					showArticle(val, false);
				}
			}
		}
		
	} else {
		hideArticle();
	}
}

function showArticle(articleID, animation) {
	var elArticle = $("#article_" + articleID);
	
	if (elArticle.length) {
		elArticle.show();
	} else {
		// AJAX
		
	}
	
	if (!animation) {
		$(".b-article-page").show();
		$(".b-article-page__back").css({ position: "fixed"});
	} else {
		$(".b-article-page").css({
			"overflow": "hidden",
			"position": "fixed",
			"top": "100%"
		});
		
		$(".b-article-page").show().animate({
			top: 0
		}, function(){
			$(this).css({
				"overflow": "visible",
				"position": "absolute",
				"top": "0"
			});
			$(".b-article-page__back").css({ position: "fixed"});
		});
	}
	// CAROUSEL
	initCarousel();
}

function hideArticle() {
	$(".b-article-page").fadeOut(function(){
		$(".b-article").hide();
		$(".b-article-page__back").css({ position: "absolute"});
	});
	
	//window.location.hash = "";
}

function runAnimationSection(section) {
	section.find(".animation-block").each(function(){
		runAnimationBlock($(this));
	});
	
}

function runAnimationBlock(animationBlock) {
	var animationTimeOut = parseInt(animationBlock.data("animation-timestart")),
		animationTimePlus = 100;
		
	if (isNaN(animationTimeOut))
		animationTimeOut = 0;
	
	var animationClass = animationBlock.data("animation-class");
	
	animationBlock.find(".animation").each(function(index){
		var element = $(this);
		
		setTimeout(function(){
			element.addClass(animationClass);
		}, animationTimeOut);
		
		animationTimeOut = animationTimeOut + animationTimePlus;
	});
}