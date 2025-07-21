# Stock Purchase Backend API

A Node.js backend API for Google login, Stripe payment integration, and real-time stock quantity management using MongoDB.

---

## Tech Stack

- Node.js + Express.js
- MongoDB (Mongoose)
- Google OAuth 2.0
- Stripe Checkout + Webhooks
- JWT Authentication
- Jest (for unit testing)

---

## Features

- Google OAuth login and JWT-based session
- Stripe payment for purchasing company stock
- Real-time update of available stock quantity
- Webhook listener to verify Stripe payment
- Unit-tested with Jest (mocked DB layer)

---

## Folder Structure

.
├── config/
├── controllers/
├── middlewares/
├── routes/
├── models/
├── utils/
├── screenshots/
├── tests/
├── .env.example
├── .gitignore
├── README.md
├── app.js

---

## Environment Setup

Create a `.env` file based on the example:

```env
PORT=5000
MONGODB_URI=mongodb-url
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT=your-google-redirect-url
JWT_SECRET=your-jwt-secret
STRIPE_SECRET=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret
FRONTEND_REDIRECT_URL=http://localhost:3000/login/callback

---

## How to Run

```bash
# Install dependencies
npm install

# Start server
npm start

# Run tests
npm test
```

---

##  API Endpoints

###  Auth

- `GET /auth/google` → Redirect to Google login
- `GET /auth/google/callback` → Handles Google OAuth callback

###  Company

- `GET /companies` → Get all companies
- `GET /companies/:id` → Get specific company

###  Payment

- `POST /payment/create` → Create Stripe session
- `POST /webhook/stripe` → Stripe webhook listener

---

##  Middlewares

- `middleware/auth.js` → Validates JWT for protected routes

---

##  Tests

Run unit tests using:

```bash
npm test
```

Tested:
- Session validation (`validatePaymentSession.js`)
- Company lookup with mocked Mongoose (`getCompanyById`)

---

##  Screenshots

| Screenshot                      |  Filename              |
|---------------------------------|-------------------------------|
| Google Login JWT response       | `screenshots/google-login.png`
| Google Login Permission         | `screenshots/google-login-permission.png`
| Stripe Checkout screen          | `screenshots/stripe-checkout.png`
| MongoDB stock before            | `screenshots/stock-db-before.png`
| MongoDB stock after             | `screenshots/stock-db-after.png`
| Terminal test pass output       | `screenshots/tests-pass.png`

---

##  Project Flow

1. User logs in with Google
2. JWT is returned and used in headers
3. `/create` triggers Stripe
4. After successful payment, webhook hits `/webhook/stripe`
5. Stock quantity is updated in MongoDB

---

##  Next Steps

- Add Portfolio model with transaction records
- Add user dashboard for tracking purchases

---

##  Author

Praveen Dung – Backend Developer 