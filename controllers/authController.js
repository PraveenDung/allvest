const client = require('../config/googleOAuth');
const User = require('../models/User')
const { generateToken } = require('../utils/jwt')


//Redirect User to Google login
exports.googleRedirect = (req, res) => {
    const redirectUrl = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['profile', 'email'],
    });
    res.redirect(redirectUrl)
}

//callback route after google login
exports.googleCallback = async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send('Missing auth code');

    try {
        //Exchange code for access token
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        //Fetch user info from google
        const userInfo = await client.request({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        });

        const { id, email, name, picture } = userInfo.data;

        //Find or create user
        let user = await User.findOne({ googleId: id })
        if (!user) {
            user = await User.create({ googleId: id, email, name, picture });
        }

        //Generate JWT
        const token = generateToken({ id: user._id, email: user.email })

        // Redirect to frontend with token
        const redirectUrl = `${process.env.FRONTEND_REDIRECT_URL}?token=${token}`;
        res.redirect(redirectUrl);
    } catch (err) {
        console.error('OAuth callback error:', err.message);
        res.status(500).send('Google login failed');
    }
}