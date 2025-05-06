import bcrypt from 'bcryptjs'

export const users = []

export const registerUser = async user => {
	const existingUser = users.find(u => u.email === user.email)
	if (existingUser) {
		return { success: false, message: "Siz ro'yhatdan o'tgansiz" }
	}

	const hashedPassword = await bcrypt.hash(user.password, 10)

	users.push({
		email: user.email,
		password: hashedPassword,
	})
	return {
		success: true,
		message: "Siz muvaffaqiyatli ro'yhatdan o'tdingiz. ",
	}
}
