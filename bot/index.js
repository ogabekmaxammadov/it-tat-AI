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
							url: 'https://ubiquitous-sundae-3e260a.netlify.app/',
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
