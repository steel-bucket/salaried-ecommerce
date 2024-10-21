"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.formatPrice = formatPrice;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
function formatPrice(price, options) {
    if (options === void 0) { options = {}; }
    // const { currency = 'USD', notation = 'standard' } = options
    var _a = options.currency, currency = _a === void 0 ? 'INR' : _a, _b = options.notation, notation = _b === void 0 ? 'standard' : _b;
    var numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        notation: notation,
    }).format(numericPrice);
}
