const express = require('express')
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware')

//Sample protected route
router.get('/test', authenticateJWT, (req, res) => {
    res.json({
        message: 'Data',
        user: req.user,  //Comes from JWT
    })
})

module.exports = router