// Импорты и переменные
// Мы достаём библиотеку из node_modules/{{express}}/index.js
const express = require('express');
const products = require('./src/js/products');
const advantages = require('./src/js/advantages')
const bot = require('./src/js/telegraf');

// Задаём порт
const port = 3000;

// Настройки сервера
// Получем юазовое приложение
const app = express();
bot.launch();

// Начтраиваем двиок отображения
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/axios/dist'));

// Говорим что будет, если постучать в корень сайта
app.get('/', (req, res) => {
	res.render(
		'index',
		{
			title: 'Магазин настолок',
			message: 'Онлайн-магазин настолок',
			products,
			advantages
		}
	)
})

// Запуск сервера
app.listen(port, () => {
	console.log(`The server is running on port ${port}`);
})