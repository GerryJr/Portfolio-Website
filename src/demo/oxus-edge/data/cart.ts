// Cart state — driven by STORE_CONFIG.cart
// In production this would be session/cookies/context

import { STORE_CONFIG } from "./config";

export const cartItems = STORE_CONFIG.cart;
