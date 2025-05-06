import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MessagingPage from '../pages/MessagingPage'
import RegistrationPage from '../pages/RegistrationPage'
import './App.css'

function App() {
	return (
		<div className='container'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/chat' element={<MessagingPage />} />
				<Route path='Registration' element={<RegistrationPage />} />
			</Routes>
		</div>
	)
}

export default App
