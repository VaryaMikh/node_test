// Мы достаем библиотеку из node_modules/{{express}}/index.js
const express = require('express');
const products = require('./src/js/products');
const brands = require('./src/js/brands');
const bot = require('./src/js/telegraf');
const getRequestCallMessageTemplate = require('./src/js/telegram/templates/requestCall.js');
const bodyParser = require('body-parser');

// Задаем порт
const port = 3000;
const requestCalChatId = '-406798742';

// Получаем базовое приложение
const app = express();

bot.launch();

// Настраиваем движок отображения
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/axios/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

// Говорим, что будет, если постучать в корень сайта
app.get('/', (req, res) => {
	const mainPageProducts = products.filter(product => product.id <= 4);
	res.render(
		'index', 
		{
			title: 'Drondulet',
			message: 'Купи дрона сегодня, летай уже к вечеру',
			products: mainPageProducts
		}
	)
})

app.get('/drones', (req, res) => {
	res.render(
		'drones',
		{
			pageTitle: 'Все дроны',
			products
		}
	)
})

app.get('/api/newRequest', (req, res) => {
	bot.telegram.sendMessage(
		requestCalChatId,
		prepareRequestCallMessage(req.query)
	)
	res.redirect('/');
})

app.post('/api/purchaseRequest', (req, res) => {
	console.log('Data', req.body);

	const product = products.find(product => product.id == req.body.productId);

	bot.telegram.sendMessage(
		requestCalChatId,
		`
		_______________
		Добрый день! Новая заявка!

		Имя: ${req.body.name}
		Почта: ${req.body.email}
		Телефон: ${req.body.phone}

		Продукт для покупки:
		${product.name}
		Дополнительные лопасти: ${req.body.extraBlades}
		Дополнительный аккумулятор: ${req.body.extraAccumulator}

		`
	);

	res.json('status', 200);
})

app.get('/:brand', (req, res) => {
	const brandProducts = products
		.filter(product => product.brand.toLowerCase() === req.params.brand.toLowerCase());
	console.log(brandProducts);

	if (brandProducts.length) {
	const brandInfo = brands.find(brand => brand.name.toLowerCase() === req.params.brand.toLowerCase());

		res.render(
			'brand',
			{
				pageTitle: `Дроны от бренда ${req.params.brand}`,
				products: brandProducts,
				brandInfo
			}
		)
	} else {
		console.log('Тут Фиаско! Такого бренда не существует');
		res.redirect('/');
	}
})

app.get('/:brand/:id', (req, res) => {
	console.log('brand + id', req.params.brand);
	const brandProducts = products
		.filter(product => product.brand.toLowerCase() === req.params.brand.toLowerCase());
	console.log(brandProducts);

	if (brandProducts.length) {
		const pageItem = brandProducts.find(product => product.id == req.params.id);

		if (pageItem) {
			res.render(
				'product',
				{
					pageTitle: `Купить дрон ${pageItem.name}`,
					brandName: req.params.brand,
					product: pageItem
				}
			)
		} else {
			console.log('Тут Фиаско, но бренд есть - посмотри ещё у них');
			res.redirect('/');
		}

	} else {
		console.log('Тут Фиаско! Такого бренда не существует');
		res.redirect('/');
	}
})

// Запуск сервера
app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
})