var sticky_pos, banner_height = "";
$(document).ready(function(){
	banner_height = $('.main-banner').height();
	sticky_pos = banner_height - $('.header').height()*2;	
	stickyHeader();
	
	/*Mobile Menu*/
    $('.menu-trigger').on('click', function() {
        $('body').addClass('menu-active');
        $('.header').toggleClass('open');
        $('.menu-overlay').toggleClass('open');
    });
    $('.close-icon, .menu-overlay, .header-container:after').on('click', function() {
        $('.header').removeClass('open');
        $('.menu-overlay').removeClass('open');
    });
	
	/*var today = new Date();
	var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+ today.getDate() + ' ' + h + ':' + m + ':' + s + '';
	$('.UTC-dated').html(date);*/
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	var mm = parseInt(today.getMonth()) + 1;
	
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
	mm = checkTime(mm);	
    document.getElementById('UTC-dated').innerHTML = today.getFullYear()+'-'+(mm)+'-'+ today.getDate() + ' ' + h + ":" + m + ":" + s ;
    t = setTimeout(function () {
        startTime()
    }, 500);
}
startTime();

$('.menu-container ul li a').on('click', function(){
	if($(this).attr('data-attr')){
			var get_id = $(this).attr('data-attr');
			var get_pos = $('#' + get_id).offset().top - 70;
			  $("html, body").animate({scrollTop: get_pos + "px"}, 1000);
			  console.log('hi');
	}
	
})
	
});




$(window).scroll(function(){
	stickyHeader();
});

function stickyHeader(){
	var scroll_top = $(window).scrollTop();
	if(scroll_top > sticky_pos && $('body').hasClass('home')){
		$('.header').addClass('sticky');
	}
	else{
		$('.header').removeClass('sticky');
		}		
}