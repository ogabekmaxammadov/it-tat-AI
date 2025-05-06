import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../../facaBackend'
import './RegistrationSection.css'

const RegistrationSection = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [emailValid, setEmailValid] = useState(true)

	const handleChange = event => {
		const emailValue = event.target.value
		setEmail(emailValue)

		if (emailValue.includes('@gmail.com')) {
			setEmailValid(true)
		} else {
			setEmailValid(false)
		}
	}

	const hasTwoLetters = password => {
		const letterRegex = /[a-zA-Z]/g
		const matches = password.match(letterRegex)
		return matches && matches.length >= 2
	}

	const handleSubmit = async e => {
		e.preventDefault() // Formani yuborishni oldini olish

		// Ma'lumotlarni tekshirish
		if (
			!name ||
			!email ||
			!password ||
			password !== confirmPassword ||
			!emailValid
		) {
			alert('Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring!')
			return
		}

		// Backendga yuborish
		const response = await registerUser({ name, email, password })

		// Javobni tekshirish
		if (response.success) {
			alert(response.message)
			// Foydalanuvchini boshqa sahifaga yo'naltirish
			window.location.href = '/chat'
		} else {
			alert(response.message)
		}
	}

	return (
		<div className='registration'>
			<form className='form' onSubmit={handleSubmit}>
				<label htmlFor='Full Name'>Full Name:</label>
				<input
					type='text'
					name='Full Name'
					placeholder='Your full name'
					value={name}
					className={`${name.length < 5 ? 'border-red' : 'border-green'} ${
						name === '' ? 'border-white' : ''
					}`}
					onChange={e => setName(e.target.value)}
				/>

				<label htmlFor='Email'>Email:</label>
				<input
					type='email'
					name='Email'
					placeholder='Your Email'
					value={email}
					className={`${
						email === ''
							? 'border-white'
							: emailValid
							? 'border-green'
							: 'border-red'
					}`}
					onChange={handleChange}
				/>

				<label htmlFor='Password'>Password:</label>
				<input
					type='password'
					name='Password'
					placeholder='Create the password'
					value={password}
					onChange={e => {
						const value = e.target.value
						setPassword(value)

						// Kamida 2 ta harf borligini tekshirish
						if (!hasTwoLetters(value)) {
							console.log('Password must contain at least 2 letters')
						}
					}}
					className={`${
						password.length < 8 || !hasTwoLetters(password)
							? 'border-red'
							: 'border-green'
					} ${password === '' ? 'border-white' : ''}`}
				/>

				<label htmlFor='Confirm Password'>Confirm Password:</label>
				<input
					type='password'
					name='Confirm Password'
					placeholder='Confirm the password'
					value={confirmPassword}
					className={`${
						confirmPassword === password ? 'border-green' : 'border-red'
					} ${confirmPassword.length === 0 ? 'border-white' : ''}`}
					onChange={e => setConfirmPassword(e.target.value)}
				/>

				<Link to={'/chat'} type='submit' className='registration-btn'>
					Registration
				</Link>
			</form>
		</div>
	)
}

export default RegistrationSection
