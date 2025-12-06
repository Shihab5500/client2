# BloodBond - Blood Donation Application
Purpose: A MERN stack app to connect donors with people who need blood.

## Live
Client: https://your-client-live-link.com  
Server: https://your-server-live-link.com  

## Features
- Role based dashboard (Donor/Admin/Volunteer)
- Donor registration with avatar upload (imgBB)
- Search donors by blood group & location
- Create/manage donation requests with full status flow
- Admin user management (block/unblock, role change)
- Volunteer request status management only
- Funding page with Stripe payment + dashboard stats
- JWT protected APIs

## Packages
Client: react-router-dom, firebase, tailwind, axios, recharts, stripe, framer-motion  
Server: express, mongodb, cors, dotenv, jsonwebtoken, stripe  

## Admin Credentials
Email: admin@example.com  
Password: 123456  

## Run Locally
```bash
cd server
npm i
cp .env.example .env
npm run dev

cd ../client
npm i
cp .env.example .env
npm run dev
```
