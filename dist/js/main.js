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
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
			console.log(id);
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});

});
