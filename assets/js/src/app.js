$( document ).ready(function() {

	SCROLL_SPEED = 1000;
	
	function setBoxHeight(){
		$(".home, .tutors, .team").css("min-height", $(window).height() + "px");
		var h = $(window).height();
		if(h < 700) {
			$(".home .bg").css("min-height", "700px");
		} else {
			$(".home .bg").css("min-height", $(window).height() + 80 + "px");
		}
	}
	setBoxHeight();
	
	$('.countdown').countdown('2015/1/30', function(event) {
		$(this).html(event.strftime('%D <span>days</span> %H <span>hrs</span> %M <span>min</span> %S <span>sec</span>'));
	});

	function setIconBarHeight(){
    	var iconbar = $(".message .icon");
		iconbar.height(iconbar.parent().find(".copy").height()+20);
    }
    setIconBarHeight();

	// var $menu = $(".mobileactionbar");

	// var $team = $("#team").offset().top;
	// var $workshops = $("#workshops").offset().top;
	// var $events = $("#events").offset().top;
	// var $home = $("#home").offset().top;
	// var $headernav = $(".header-nav");

 //    $(document).scroll(function() {
 //        if (300 <= $(document).scrollTop()) {
 //            $menu.addClass("shine");
 //            $headernav.addClass("shine");
 //            $('body').addClass("bg");
 //        } else {
 //        	$menu.removeClass("shine");
 //        	$headernav.removeClass("shine");
 //        }
 //    });

    $(window).on('resize', function(){
    	// setBoxHeight();
    	setIconBarHeight();
    });


});