const { Telegraf } = require('telegraf');

const bot = new Telegraf('1702054709:AAE-34k0MlIvrtq8RIKfS2tZ5IYZRzv5_6U');

bot.start((ctx) => {
    console.log('Context: ', ctx);
    ctx.reply('Привет, мешок с костями!');
});

bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Что тебе нужно, мешок с костями'));

module.exports = bot;
// bot.launch();