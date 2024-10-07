"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
var stripe_1 = __importDefault(require("stripe"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env'),
});
exports.stripe = new stripe_1.default((_a = process.env.STRIPE_SECRET_KEY) !== null && _a !== void 0 ? _a : 'sk_test_51Q5uAYP69aOrZAXYFhldDL0oEn9vNqXH5gLS6soEEjkBzR3hkA7GchHJvtHgX7oVGA9mdoLPkVtERWa42xHXL2vl00v4EiBfQI', {
    apiVersion: '2024-09-30.acacia',
    typescript: true,
});
