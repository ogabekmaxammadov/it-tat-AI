import React from 'react'
import { Link } from 'react-router-dom'
import './HomeSection.css'

const HomeSection = () => {
	return (
		<div>
			<div className='homeSection'>
				<h1>Welcome</h1>
				<div className='aiSection'>
					<h3>IT TAT </h3>
					<div className='ai'>
						<h4>AI</h4>
					</div>
				</div>

				<p>Chat with your friends and family</p>
				<div className='btns'>
					<Link to={'/registration'}>Registration</Link>
					<Link to={'/registration'}>Login</Link>
				</div>
			</div>
		</div>
	)
}

export default HomeSection
