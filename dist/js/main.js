$( document ).ready(function() {

	// gallery init
	$('.owl-carousel').owlCarousel({
		loop: true,
		margin: 0,
		responsive:{
			0:{
				items:1
			},
		}
	});

	// scroll to anchor init
		$('.scrollto').click(function (event) {
		event.preventDefault();

		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		
		$('body,html').animate({scrollTop: top}, 1500);
	});

});
