import Stripe from 'stripe'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// @ts-ignore
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
    path: path.resolve(dirname, '../../.env'),
})

// @ts-ignore
export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ||
        'sk_test_51Q5uAYP69aOrZAXYFhldDL0oEn9vNqXH5gLS6soEEjkBzR3hkA7GchHJvtHgX7oVGA9mdoLPkVtERWa42xHXL2vl00v4EiBfQI',
    {
        // apiVersion: '2024-09-30.acacia',
        typescript: true,
    }
)
