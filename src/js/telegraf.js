const { Telegraf } = require('telegraf');

const bot = new Telegraf('1617804639:AAG4DlK6TR_6McP4bD7asbC0OEdfjiCSHy0');

bot.start((ctx) => {
	console.log('CTX ', ctx.update.message.chat);
	ctx.reply('Привет, мешок с костями!');
});

bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Что тебе нужно, мешок с костями'));

module.exports = bot;