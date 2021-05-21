
let productsContainer = document.getElementsByClassName('market__cards')[0];
let filterBtn = document.getElementsByClassName('filter__apply')[0];
let priceFrom = document.getElementById('price__from__input');
let priceTo = document.getElementById('price__to__input');
let filterOptions = document.getElementsByClassName('option__checkbox');
let filterLabels = document.getElementsByClassName('check__label');


async function getProducts(url, options) {
	productsContainer.innerHTML = '';
  let productsJSON = await fetch(url);
  let products = await productsJSON.json();

	localStorage.setItem('length', products.length);
	
	for (let i = 0; i < products.length; i++) {

		let productStr = `<li class="card">
		<a href="/card?name=${products[i].name}&id=${i}" target="_blank" class="card__link">
			<img src="/Sources/ex.png" alt="honey">
			<h4>${products[i].name}</h4></a> 
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
			<button class="card__decrease"></button><input min="1" id="count${i}" type="number" class="card__qnnt__input" value="1"><button class="increase"></button>
		</div>
		<div class="card__bottom">
			<div class="card__bottom__inner">
				<span class="card__price" id="card-price${i}">${products[i].price} ₽</span><span class="card__old__price">${products[i].price + products[i].discount} ₽</span>
			</div>
			<button class='card__addtocart' id="card__addtocart${i}">
				<span class="card__addtocart__text">в корзин</span>
			</button>
		</div>
</li>`;

		if (options && (options.filters.includes(products[i].category.toLowerCase()) && (options.priceFrom <= products[i].price && options.priceTo >= products[i].price) )) {
			productsContainer.insertAdjacentHTML('beforeend', productStr);
		}
		else if (options && options.filters.includes(products[i].category.toLowerCase())) {
			productsContainer.insertAdjacentHTML('beforeend', productStr);
		}
		else if (options && (options.priceTo >= products[i].price && options.priceFrom <= products[i].price)) {
			productsContainer.insertAdjacentHTML('beforeend', productStr);
		}
		else if (options && (options.priceTo >= products[i].price && options.priceFrom.isNaN())) {
			productsContainer.insertAdjacentHTML('beforeend', productStr);
		}
		else if (options && (options.priceTo.isNaN() && options.priceFrom <= products[i].price)) {
			productsContainer.insertAdjacentHTML('beforeend', productStr);
		}
		else if (!options) {
			productsContainer.insertAdjacentHTML('beforeend', productStr);
		} 


	let addToCartBtn = document.getElementById(`card__addtocart${i}`);
	let cardPrice = document.getElementById(`card-price${i}`);
	let weights = document.getElementsByClassName(`card-weight${i}`);

	let counter = document.getElementById(`count${i}`);
	
	if (addToCartBtn) {
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
				cardPrice.innerHTML = products[i].price + ' ₽';
			});
		}

	addToCartBtn.addEventListener('click', _ => {
		localStorage.setItem(`name${i}`, products[i].name);//Product Name
		localStorage.setItem(`price${i}`, products[i].price);//Product Price
		localStorage.setItem(`discount${i}`, products[i].discount);//Product Discount
		localStorage.setItem(`count${i}`, counter.value);//Product Counter
	});
	

  $(`#card__addtocart${i}`).click(function(){
		if ( parseInt($(this).parent().parent().find('>.card__qnt').find('>.card__qnnt__input').val()) >0  ){
			
			if ($(this).hasClass('card__addtocart__active')) {
				location.href = "/cart";
				$(this).removeClass('card__addtocart__active');
			}else $(this).addClass('card__addtocart__active');
		}
	});

  
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



$('.check__label').keydown(function(e) {
	if((e.keyCode === 13)||(e.keyCode === 32)) {
	 $(this).click();
	}
	 });
$('.increase').click(function(){
	 $(this).parent().find('>.card__qnnt__input').val(parseInt($(this).parent().find('>.card__qnnt__input').val()) + 1);
});

$('.card__decrease').click(function(){
	if(parseInt($(this).parent().find('>.card__qnnt__input').val())>1 )
	$(this).parent().find('>.card__qnnt__input').val(parseInt($(this).parent().find('>.card__qnnt__input').val()) - 1);
});
}



getProducts('/getProducts');

filterBtn.addEventListener('click', _ => {
	let filters = []
	for (let i = 0; i < filterOptions.length; i++) {
		if (filterOptions[i].checked) {
			filters.push(filterLabels[i].innerText.toLowerCase());
		}
	}
	if (filters.length > 0 || (priceFrom.value !== '' && priceTo.value !== '') ) {
		getProducts('/getProducts', {filters, priceFrom: parseInt(priceFrom.value), priceTo: parseInt(priceTo.value)});
	} else {
		getProducts('/getProducts');
	}
});