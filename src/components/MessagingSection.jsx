import React, { useEffect, useState } from 'react'
import '../App.css'

const MessagingSection = () => {
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')

	useEffect(() => {
		const initialMessage = {
			text: 'Hi, How can I help you? ? 😊',
			sender: 'bot',
		}
		setMessages([initialMessage])
	}, [])

	const sendMessage = async () => {
		if (input.trim() !== '') {
			const userMessage = { text: input, sender: 'user' }
			setMessages(prev => [...prev, userMessage])

			try {
				const response = await fetch(
					'https://openrouter.ai/api/v1/chat/completions',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${
								import.meta.env.VITE_OPENROUTER_API_KEY
							}`,
							'HTTP-Referer': window.location.origin,
						},
						body: JSON.stringify({
							model: 'mistralai/mistral-7b-instruct',
							messages: [
								{
									role: 'system',
									content:
										'you are a bot that helps users. you are friendlly and helpful. ',
								},
								...messages.map(msg => ({
									role: msg.sender === 'user' ? 'user' : 'assistant',
									content: msg.text,
								})),
								{ role: 'user', content: input },
							],
						}),
					}
				)

				if (!response.ok) {
					console.error('API xatosi:', response.status, response.statusText)
					return
				}

				const data = await response.json()
				const botMessage = {
					text: data.choices[0].message.content,
					sender: 'bot',
				}

				setMessages(prev => [...prev, botMessage])
				setInput('')
			} catch (error) {
				console.error('Tarmoq xatosi:', error)
			}
		}
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			sendMessage()
		}
	}

	return (
		<div>
			<div className='container'>
				<div className='header'>
					<h1>Gpt</h1>
					<h3>O</h3>
				</div>
				<div className='message-earea'>
					{messages.map((message, index) => (
						<div
							className={`message ${
								message.sender === 'user' ? 'user-message' : 'bot-message'
							}`}
							key={index}
						>
							{message.text}
						</div>
					))}
				</div>
				<div className='message-input'>
					<input
						type='text'
						placeholder='type your message...'
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button className='send-btn' onClick={sendMessage}>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

export default MessagingSection
