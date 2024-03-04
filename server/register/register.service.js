const prisma = require('../db')
const bcrypt = require('bcrypt')

const register = async (userData) => {

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: userData.email,
            fullname: userData.fullname,
            username: userData.username,
            password: hashedPassword
        }
    })

    return newUser

}

module.exports = {
    register,
}