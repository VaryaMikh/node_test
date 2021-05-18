// Мы достаем библиотеку из node_modules/{{express}}/index.js
const express = require('express');
const products = require('./src/js/products');
const bot = require('./src/js/telegraf');
const getRequestCallMessageTemplate = require('./src/js/telegram/templates/requestCall.js');
const bodyParser = require('body-parser');

// Задаем порт
const port = 3000;
const requestCalChatId = '-406798742';

// Получаем базовое приложение
const app = express();

// bot.launch();

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
	res.render(
		'index', 
		{
			title: 'Drondulet',
			message: 'Купи дрона сегоня, летай уже к вечеру',
			products
		}
	)
})

app.get('/product', (req, res) => {
	res.render(
		'product',
		{
			pageTitle: 'Страница продукта'
		}
	)
})

app.get('/api/request-call', (req, res) => {
	console.log('Запрос', req.query);

	
	bot.telegram.sendMessage(
		requestCallChatId(),
		getRequestCallMessageTemplate(req.query)
	)

	// отправить информацию через бота

	res.redirect('/');

})

// Запуск сервера
app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
})