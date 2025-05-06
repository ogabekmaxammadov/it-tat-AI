/*eslint no-undef: "error"*/

import { Telegraf } from 'telegraf'

const bot = new Telegraf(import.meta.env.VITE_BOT_TOKEN)

bot.start(ctx => {
	ctx.reply('Web App ni ochish uchun tugmani bosing', {
		reply_markup: {
			keyboard: [
				[
					{
						text: 'Web App ochish',
						web_app: {
							url: 'https://dainty-smakager-d9f0a1.netlify.app/',
						},
					},
				],
			],
			resize_keyboard: true,
			one_time_keyboard: true,
		},
	})
})

bot.launch()

console.log('Bot ishga tushdi...')
