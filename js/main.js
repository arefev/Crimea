// MAIN JavaScript

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


$(function(){
	// FIRST PAGE
	$(".b-first-page").on("mousewheel DOMMouseScroll", function(event){
		$(this).css('transform', 'translateY(-150%)')
	});
	
	// ABOUT PROJECT
	$(".b-about-project .b-button").click(function(){
		$(".b-about-project").hide();
		runAnimationBlock($(".b-sections"));
	});
	
	// SECTIONS
	$(".b-sections__item .b-button").click(function() {
		$(".b-sections__item .b-small-icon").addClass('active');
		$(".b-sections").addClass("min");
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
	
	// POPUP
	$(".b-popup-slider").on("click", ".b-button-detail .b-button", function() {
		var elItem = $(this).closest(".b-item"),
			elDetail = elItem.find(".b-detail"),
			btnText = $(this).text(),
			btnChangeText = $(this).data("change-text");
			
		$(this).text(btnChangeText).data("change-text", btnText);
		
		if (elDetail.is(":visible")) {
			elDetail.slideUp();
		} else {
			elDetail.slideDown();
		}
	});
	
	$(".b-popup-slider .b-close, .b-popup__fill").click(function(){
		$(".b-popup").fadeOut();
	});
	
	$(".b-popup-slider .b-arrow").click(function(){
		var elSlider = $(this).closest(".b-popup-slider"),
			elItem = elSlider.find(".b-item"),
			animOptions = {
				opacity:0
			}
			
		if ($(this).is(".b-arrow_left")) {
			animOptions.right = "-50%"
		} else {
			animOptions.left = "-50%"
		}
			
		elItem.animate(animOptions, function(){
			$(this).hide();
		});
	});
	
	centerPopup($(".b-popup-slider"));
});

$(window).resize(function(){
	centerPopup($(".b-popup-slider"));
});

function showPopup(element)
{
	element.show();
	$("#windowFill").show();
	
	centerPopup(element);
}

function hidePopup(element)
{
	if (!element.length)
	{
		element = $(".b-popup:visible");
	}
	
	element.hide();
	$("#windowFill").hide();
}

function centerPopup(element)
{
	var elWidth = element.width(),
		elHeight = element.height(),
		windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		scrollTop = 0,
		left = windowWidth/2 - elWidth/2,
		top = windowHeight/2 - elHeight/2 + scrollTop;
	
	if (left < 0) left = 0;
	if (top < 0) top = 0;
	
	element.css({
		left:left
	});
	
	var item = element.find(".b-popup-slider__inner"),
		itemWidth = item.width(),
		itemHeight = item.height(),
		left = -itemWidth/2 - 50,
		top = windowHeight/2 - itemHeight/2 + scrollTop;
		
	if (top < 20) top = 20;
	
	item.css({
		left:"50%",
		top:top,
		marginLeft: left
	});
}