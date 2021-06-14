const buyProductModal = new bootstrap.Modal(document.getElementById('buyProductModal'));

function addToCard(product) {
	console.log(product);

	let finalPrice = product.price - product.discount;

	const extraAccumulator = document.getElementById('extraAccumulator').checked;
	const extraBlades = document.getElementById('extraBlades').checked;

	if (extraAccumulator) {
		finalPrice += product.extraAccumulatorPrice;
	}

	if (extraBlades) {
		finalPrice += product.extraBladesPrice;
	}

	console.log(finalPrice);

	document.getElementById('finalPrice').innerText = `${finalPrice}₽`;

	buyProductModal.show();
}

function closeModal() {
	buyProductModal.hide();
}

function sendPurchaseRequest(product) {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;

	if (!name || !email || !phone) {
		alert('Заполните все поля, пожалуйста');
		return;
	}

	const extraAccumulator = document.getElementById('extraAccumulator').checked;
	const extraBlades = document.getElementById('extraBlades').checked;

	axios.post(
		'/api/purchaseRequest',
		{
			name,
			email,
			phone,
			productId: product.id,
			extraAccumulator,
			extraBlades
		}
	)
	.then(response => {
		alert('Спасибо за заказ. Мы скоро свяжемся с вами!');
	})
	.catch(err => {
		console.error(err);
		alert('Просим прощения - какая-то неизвестная ошибка.');
	})
}