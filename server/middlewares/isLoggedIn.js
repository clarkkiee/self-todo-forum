const Swal = require('sweetalert2')

const isLoggedIn = (req, res, next) => {
    if(req.cookies.access_token){
       return res.status(401).send('Already logged in')
    } else {
        next()
    }
}

module.exports = {
    isLoggedIn
}