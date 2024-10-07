import Stripe from 'stripe'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
})

// @ts-ignore
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY , {
    apiVersion: '2024-09-30.acacia',
    typescript: true,
})
