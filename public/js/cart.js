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
	
});


let cartContainer = document.getElementById('cart');
let globalSumHTML = document.getElementById('global-sum');
let globalSum = 0;
let actualSumHTML = document.getElementById('actual-sum');
let actualSum = 0;
let discountHTML = document.getElementById('discount');
let discount = 0;
let products;

fetch('/getProducts').then(data => {
	return data.json();
}).then(data => {
	products = data;
	console.log(products);
}).catch(e => {
	console.log(e);
})


let productsLength = localStorage.getItem('length') ? parseInt(localStorage.getItem('length')) : localStorage.length;

setTimeout(function() {
	for (let i = 0; i < productsLength; i++) {
		if (localStorage.getItem(`name${i}`)) {
	
			let oldPriceProduct = parseInt(localStorage.getItem(`price${i}`)) + parseInt(localStorage.getItem(`discount${i}`));
	oldPriceProduct
			cartContainer.insertAdjacentHTML('beforeend', `<li id="card${i}" class="card">
		<a href="/card?name=${localStorage.getItem(`name${i}`)}&id=${i}" target="_blank" class="card__link">
			<img src="/Sources/ex.png" alt="honey">
			<h4>${localStorage.getItem(`name${i}`)}</h4></a> 
		<div class="card__weight">
			<input type="radio" name="card2-weight" checked id="card2-weight__option1" class="card-weight${i}"> 
			<label for="card2-weight__option1">120 гр.</label>
			
			<input type="radio" name="card2-weight" id="card2-weight__option2" class="card-weight${i}">
			<label for="card2-weight__option2">0.5 кг</label>
			
			<svg width="15" height="13.5" viewBox="0 0 10 7" class="weight__extender deactive" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L5 5L9 1" stroke="#2F6B75" stroke-width="1.5"/>
				</svg>
				
				
			<div class="card__weight--extended">
				<input type="radio" name="card2-weight" id="card2-weight__option3" class="card-weight${i}">
				<label for="card2-weight__option3">1 кг</label>
	
				<input type="radio" name="card2-weight" id="card2-weight__option4" class="card-weight${i}">
				<label for="card2-weight__option4">5 кг</label>  
			</div>  
		</div>
		<div class="card__qnt"> 
			<button id="count_decrease${i}" class="card__decrease"></button><input value="${localStorage.getItem(`count${i}`)}" min="1" id="count${i}" type="number" class="card__qnnt__input" value="1"><button id="count_increase${i}" class="increase"></button>
		</div>
		<div class="card__bottom">
			<div class="card__bottom__inner">
				<span id="price${i}" class="card__price">${localStorage.getItem(`price${i}`) * (localStorage.getItem(`count${i}`) ? parseInt(localStorage.getItem(`count${i}`)) : 1)} ₽</span><span id="oldprice${i}" class="card__old__price">${oldPriceProduct * (localStorage.getItem(`count${i}`) ? parseInt(localStorage.getItem(`count${i}`)) : 1)} ₽</span>
			</div>
			<button class='card__addtocart' id="delete-product${i}">
				<span class="card__addtocart__text">удалить</span>
			</button>
		</div>
	</li>`);
	
			let deleteBtn = document.getElementById(`delete-product${i}`);
			let productCard = document.getElementById(`card${i}`);
			let counter = document.getElementById(`count${i}`);
			let countDecrease = document.getElementById(`count_decrease${i}`);
			let countIncrease = document.getElementById(`count_increase${i}`);
			let priceHTML = document.getElementById(`price${i}`);
			let oldpriceHTML = document.getElementById(`oldprice${i}`);
			let weights = document.getElementsByClassName(`card-weight${i}`);
			let cardPrice = document.getElementById(`price${i}`);
	
			let startPrice = products[i].price;
			for (let j = 0; j < weights.length; j++) {
				weights[j].addEventListener('click', _ => {
					
					switch (j) {
						case 0:
							products[i].price = startPrice;
							localStorage.setItem(`weight${i}`, weights[j].innerText);
							break;
						case 1:
							products[i].price = startPrice * 4.2;
							localStorage.setItem(`weight${i}`, weights[j].innerText);
							break;
						case 2:
							products[i].price = startPrice * 4.2 * 2;
							localStorage.setItem(`weight${i}`, weights[j].innerText);
							break;
						case 3:
							products[i].price = startPrice * 4.2 * 2 * 5;
							localStorage.setItem(`weight${i}`, weights[j].innerText);
							break;
					}
					localStorage.setItem(`price${i}`, products[i].price);
					cardPrice.innerHTML = products[i].price + ' ₽';
				});
			}
			countDecrease.addEventListener('click', _ => {
				if (counter.value > '1') {
					localStorage.setItem(`count${i}`, parseInt(counter.value) - 1);//Product Counter
					priceHTML.innerHTML = (parseInt(priceHTML.innerHTML) - parseInt(localStorage.getItem(`price${i}`))) + ' ₽';
					oldpriceHTML.innerHTML = (parseInt(oldpriceHTML.innerHTML) - oldPriceProduct) + ' ₽';
					globalSum -= oldPriceProduct;
					globalSumHTML.innerHTML = globalSum + ' р.';
					actualSum -= (parseInt(localStorage.getItem(`price${i}`)));
					actualSumHTML.innerHTML = actualSum + ' р.';
					discount -= parseInt(localStorage.getItem(`discount${i}`));
					discountHTML.innerHTML = discount + ' р.';
					localStorage.setItem('fullPrice', parseInt(actualSum));
					localStorage.setItem('fullOldPrice', parseInt(globalSum));
					localStorage.setItem('fullDiscount', parseInt(discount));
				}
			});
			countIncrease.addEventListener('click', _ => {
				localStorage.setItem(`count${i}`, parseInt(counter.value) + 1);//Product Counter
				priceHTML.innerHTML = (parseInt(priceHTML.innerHTML) + parseInt(localStorage.getItem(`price${i}`))) + ' ₽';// Price of the product
				oldpriceHTML.innerHTML = (parseInt(oldpriceHTML.innerHTML) + oldPriceProduct) + ' ₽';// Price of the product without discount
				globalSum += oldPriceProduct;
				globalSumHTML.innerHTML = globalSum + ' р.';
				actualSum += (parseInt(localStorage.getItem(`price${i}`)));
				actualSumHTML.innerHTML = actualSum + ' р.';
				discount += parseInt(localStorage.getItem(`discount${i}`));
				discountHTML.innerHTML = discount + ' р.';
				localStorage.setItem('fullPrice', parseInt(actualSum));
				localStorage.setItem('fullOldPrice', parseInt(globalSum));
				localStorage.setItem('fullDiscount', parseInt(discount));
			});
	
			deleteBtn.addEventListener('click', _ => {
				productCard.remove();
				localStorage.removeItem(`name${i}`);
				localStorage.removeItem(`price${i}`);
				localStorage.removeItem(`count${i}`);
				localStorage.removeItem(`discount${i}`);
			});
	
			globalSum += ((parseInt(localStorage.getItem(`price${i}`)) + parseInt(localStorage.getItem(`discount${i}`)) ) * parseInt(localStorage.getItem(`count${i}`)));
			globalSumHTML.innerHTML = globalSum + ' р.';
			actualSum += (parseInt(localStorage.getItem(`price${i}`)) * parseInt(localStorage.getItem(`count${i}`)));
			actualSumHTML.innerHTML = actualSum + ' р.';
			discount += (parseInt(localStorage.getItem(`discount${i}`)) * parseInt(localStorage.getItem(`count${i}`)));
			discountHTML.innerHTML = discount + ' р.';
			localStorage.setItem('fullPrice', parseInt(actualSum));
			localStorage.setItem('fullOldPrice', parseInt(globalSum));
			localStorage.setItem('fullDiscount', parseInt(discount));
		}
	
	}

	
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
}, 50);

