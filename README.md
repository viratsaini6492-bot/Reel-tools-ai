# ReelTools AI

A simple AI creator-tools website with a secure Node.js backend.

## Run locally
1. Install Node.js 18+.
2. In this folder run: `npm install`
3. Copy `.env.example` to `.env`.
4. Put your API key in `.env`.
5. Run: `npm start`
6. Open `http://localhost:3000`

## Important
Never put your API key in `public/index.html` or any frontend JavaScript.

## Deploy
Deploy the Node.js project to a host that supports a Node/Express server. Add the environment variables `OPENAI_API_KEY` and (optionally) `OPENAI_MODEL` in the host dashboard. Then use the public URL as your website.

## Production improvements
Add rate limiting, authentication for paid features, usage limits, logging, a database, Terms/Privacy pages, and payment/ads after traffic starts.
