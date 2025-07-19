const { OAuth2Client } = require('google-auth-library')

// Google OAuth client with redirect URI for login callback
const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT
);

module.exports = client;