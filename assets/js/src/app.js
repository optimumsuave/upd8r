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
	
	$('.countdown').countdown('2015/1/31 20:00', function(event) {
        var totalHours = event.offset.totalDays * 24 + event.offset.hours;
		$(this).html(event.strftime(totalHours+' <span>hrs</span> %M <span>min</span> %S <span>sec</span>'));
	});

	function setIconBarHeight(){
    	var iconbar = $(".message .icon");
    	if(iconbar.length){
    		for(var i=0;i<iconbar.length;i++) {
				$(iconbar[i]).height($(iconbar[i]).parent().find(".copy").height()+20);
    		}
    	}
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
 //        	$menu.removeClass("sshine");
 //        	$headernav.removeClass("shine");
 //        }
 //    });

    $(window).on('resize', function(){
    	// setBoxHeight();
    	setIconBarHeight();
    });


    var title = $("title").html();
    window.datalength = 0;
    window.newlength = 0;

    $(window).blur(function() {
        window.blurred = true;
    });

    $(window).focus(function() {
        window.blurred = false;
        $("title").html(title);
        if(window.newlength != 0) {
            window.datalength = window.newlength;
        }
    });



    function renderContent(messages){
    	$(".messages").empty();
    	for(var i=0;i<messages.length;i++){
    		messages[i].appendTo($(".messages"));
    	}
    	setIconBarHeight();

    }
    function loadContent(data){
        currentTime = moment().unix();
    	if(data.length) {
    		var messages = [];
            window.newlength = data.length;
            // console.log(window.datalength, data.length);
            if(window.datalength == 0) {
                window.datalength = data.length;
            }

            if(window.datalength < data.length && window.blurred == true) {
                $("title").html("("+(data.length-window.datalength)+") "+title);
            }

            if(window.datalength > data.length) {
                window.datalength = data.length;
                $("title").html(title);
            }

    		for(var i=0;i<data.length;i++){
    			var msg = $("<div class='message'></div>");
                var col = "";
                if(data[i].color != ""){
                    col = " style='background:"+data[i].color+"'";
    			}
                $("<div class='icon'><div class='icon-inner'"+col+"><i class='fa "+data[i].icon+"'></i></div></div>").appendTo(msg);
        		var copy = $("<div class='copy'></div>");
        		$("<h1>"+data[i].title+"</h1>").appendTo(copy);
        		$("<h2>"+data[i].subtitle+"</h2>").appendTo(copy);
        		$("<p>"+data[i].descr+"</p>").appendTo(copy);
        		copy.appendTo(msg);
                if(data[i].timestamp < currentTime) {
        		  messages.push(msg);
                }
    		}
    		renderContent(messages);
    	}
    }

    function refreshContent(){
        $.getJSON("api/json/content.json", function(data){
        	console.log(data);
        	if(typeof data !== "undefined"){
        		if(typeof data.data !== "undefined"){
        			messages = data.data[0].data;
        			loadContent(messages);
        		}
        	}
        });
    }

    function unfocus(){

    }

    function updateTitle(){

    }

    setInterval(refreshContent, 30000);
    refreshContent();


});