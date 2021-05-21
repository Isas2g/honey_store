$(document).ready(function(){
	$('.menu-burger').click( function() {
		$('.menu-burger').toggleClass('fixed');
		$('.menu-burger').toggleClass('above-overlay');
		$('.bar').toggleClass('animate');
    $('body').toggleClass('onMenu'); 
		$('.overlay1').fadeToggle(100, 'linear'); 
		$('.menu-options-list').delay(100).addClass('slideDownIn');	
	});
		$('.menu-burger').keydown(function(e) {
	 if((e.keyCode === 13)||(e.keyCode === 32)) {
		$('.menu-burger').click();
	 }
		});

		$('.menu-option').click(function(){
			$(this).find('>a')[0].click();
			if ($('.menu-burger').hasClass('fixed')) {
				$('.menu-burger').click();
			}
		});

	$('.nav-search').click( function() {
		$('.nav-searchCart').toggleClass('above-overlay');
		$('body').toggleClass('onMenu');
		$('.overlay2').fadeToggle(100, 'linear');
		$('.nav-search').toggleClass('above-overlay');
		$('.nav__icon__svg').toggleClass('svg-onclick');
		$('.menu-options-list-search').delay(100).addClass('slideDownIn');
	});
	let filter__enabler__clicked = true;
	$('.filter__enabler').click(function(){
		
		$('.market__dropdownicon').toggleClass('market__dropdownicon-animated-back');
		if (filter__enabler__clicked){
			$('.filter__inner').hide();
			
			filter__enabler__clicked= !filter__enabler__clicked;
		}
		else {
			$('.filter__inner').show();
			filter__enabler__clicked= !filter__enabler__clicked;
		}
	});


	let sorts__enabler__clicked = false;
	$('.market__optionlist').hide();
	$('.sorts__enabler').click(function(){
		$('.market__dropdownicon2').toggleClass('market__dropdownicon-animated');
		if (sorts__enabler__clicked){
			$('.market__optionlist').hide();
			sorts__enabler__clicked= !sorts__enabler__clicked;
		}
		else {
			$('.market__optionlist').show();
			sorts__enabler__clicked= !sorts__enabler__clicked;
		}
	});

	let price__enabler__clicked = false;
	$('.price__input_fromto').hide();
	$('.price__enabler').click(function(){
		$('.market__dropdownicon3').toggleClass('market__dropdownicon-animated');
		if (price__enabler__clicked){
			$('.price__input_fromto').hide();
			price__enabler__clicked= !price__enabler__clicked;
		}
		else {
			$('.price__input_fromto').show();
			price__enabler__clicked= !price__enabler__clicked;
		}
	});
	
});

