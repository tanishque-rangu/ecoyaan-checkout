# Ecoyaan Checkout Flow - Interview Assignment

A simple beginner-friendly version of the Ecoyaan checkout flow using Next.js (App Router).

## Features
- Cart summary with mock products (SSR-style data)
- Shipping address form with basic validation
- Payment confirmation page
- Simulated "Pay" button → success message
- Responsive with Tailwind CSS
- State passed via localStorage (simple, no extra libs)

## How to Run Locally
1. Install Node.js (v20+)
2. Clone the repo: `git clone https://github.com/tanishque-rangu/ecoyaan-checkout
3. `cd ecoyaan-beginner`
4. `npm install`
5. `npm run dev`
6. Open http://localhost:3000

## Choices & Why
- Next.js App Router + src/ folder (modern default)
- Basic `useState` + localStorage for address persistence (easy for beginner level)
- No TypeScript / extra libs (kept simple)
- Tailwind for quick responsive styling
- Mock data from assignment JSON (hard-coded in cart/page.js)

## Deployment
Live demo: https://ecoyaan-checkout-lemon.vercel.app/

GitHub: https://github.com/tanishque-rangu/ecoyaan-checkout

Built as an MVP in a 9 hours — focused on functionality over polish.