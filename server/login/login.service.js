const prisma = require('../db')
const bcrypt = require('bcrypt')


const login = async (userDataLogin) => {

    const userLogin = await prisma.user.findFirst({
        where: {
            username: userDataLogin.username
        }
    })

    const passwordValid = await bcrypt.compare(userDataLogin.password, userLogin.password)
    // console.log(passwordValid)

    if(!passwordValid) {
        return false
    } else {
        return true 
    }


}

module.exports = {
    login
}