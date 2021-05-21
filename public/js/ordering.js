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
	
	$('.weight__extender').click(function() {
		$(this).toggleClass('market__dropdownicon-animated');
		if ($(this).hasClass('deactive')){
			$(this).parent().find('>.card__weight--extended').show();
			$(this).removeClass('deactive');
		} else {
			$(this).parent().find('>.card__weight--extended').hide();
			$(this).addClass('deactive');
		}
	});

	$('.increase').click(function(){
		 $(this).parent().find('>.card__qnnt__input').val(parseInt($(this).parent().find('>.card__qnnt__input').val()) + 1);
	});

	$('.card__decrease').click(function(){
		if(parseInt($(this).parent().find('>.card__qnnt__input').val())>1 )
		$(this).parent().find('>.card__qnnt__input').val(parseInt($(this).parent().find('>.card__qnnt__input').val()) - 1);
 });
});

let form = document.getElementById('form');
let globalSumHTML = document.getElementById('global-sum');
let actualSumHTML = document.getElementById('actual-sum');
let discountHTML = document.getElementById('discount');

let firstName = document.getElementById('name');
let surname = document.getElementById('surname');
let email = document.getElementById('email');
let tel = document.getElementById('tel');
let country = document.getElementById('country');
let city = document.getElementById('city');
let address = document.getElementById('address');
let order = '';

globalSumHTML.innerHTML = (localStorage.getItem('fullOldPrice') ? localStorage.getItem('fullOldPrice') : 0) + ' р.';
actualSumHTML.innerHTML = (localStorage.getItem('fullPrice') ? localStorage.getItem('fullPrice') : 0) + ' р.';
discountHTML.innerHTML = (localStorage.getItem('fullDiscount') ? localStorage.getItem('fullDiscount') : 0) + ' р.';

form.addEventListener('submit', async e => {
	e.preventDefault();

	let productsLength = localStorage.getItem('length') ? parseInt(localStorage.getItem('length')) : localStorage.length;

	for (let i = 0; i < productsLength; i++) {
		if (localStorage.getItem(`name${i}`)) {
			order += `Товар: ${localStorage.getItem(`name${i}`)};Количество: ${localStorage.getItem(`count${i}`) ? localStorage.getItem(`count${i}`) : 1}; Цена: ${localStorage.getItem(`price${i}`) * (localStorage.getItem(`count${i}`) ? parseInt(localStorage.getItem(`count${i}`)) : 1)} \n`;
		}
	}

	try {
		await fetch(`/sendEmail?firstName=${firstName.value}&surname=${surname.value}&email=${email.value}&tel=${tel.value}&country=${country.value}&city=${city.value}&address=${address.value}&sum=${parseInt(actualSumHTML.innerHTML)}&order=${order}`);

		Swal.fire({
			title: 'Отлично!',
			text: 'Ваши данные отправлены, ожидайте звонка',
			icon: 'success',
			confirmButtonText: 'Хорошо'
		});
	} catch (e) {
		Swal.fire({
			title: 'Ошибка!',
			text: 'Попробуйте ещё раз',
			icon: 'error',
			confirmButtonText: 'Хорошо'
		});
	}
	
});