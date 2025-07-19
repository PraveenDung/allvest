const jwt = require('jsonwebtoken')

//Generate JWT token with 1- hr expiry
function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}

module.exports = { generateToken }