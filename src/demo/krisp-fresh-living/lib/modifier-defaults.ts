// ============================================================
// KRISP FRESH LIVING — Modifier Defaults
// Default modifier groups for items that have customisation
// ============================================================

export interface ModifierOptionDefault {
  guid: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface ModifierGroupDefault {
  guid: string;
  name: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  options: ModifierOptionDefault[];
}

// ============================================================
// MILK CHOICE
// ============================================================
const milkChoice: ModifierGroupDefault = {
  guid: 'mod-milk-choice',
  name: 'Milk Choice',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { guid: 'mod-milk-whole', name: 'Whole Milk', price: 0, isDefault: true },
    { guid: 'mod-milk-oat', name: 'Oat Milk', price: 0.75 },
    { guid: 'mod-milk-almond', name: 'Almond Milk', price: 0.75 },
    { guid: 'mod-milk-coconut', name: 'Coconut Milk', price: 0.75 },
    { guid: 'mod-milk-soy', name: 'Soy Milk', price: 0.75 },
    { guid: 'mod-milk-nonfat', name: 'Non-Fat Milk', price: 0 },
  ],
};

// ============================================================
// SIZE
// ============================================================
const sizeChoice: ModifierGroupDefault = {
  guid: 'mod-size',
  name: 'Size',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { guid: 'mod-size-regular', name: 'Regular (12 oz)', price: 0, isDefault: true },
    { guid: 'mod-size-large', name: 'Large (16 oz)', price: 1.00 },
  ],
};

// ============================================================
// ESPRESSO SHOTS
// ============================================================
const espressoShots: ModifierGroupDefault = {
  guid: 'mod-espresso-shots',
  name: 'Espresso Shots',
  required: false,
  minSelections: 0,
  maxSelections: 1,
  options: [
    { guid: 'mod-extra-shot', name: 'Extra Shot', price: 1.25 },
    { guid: 'mod-double-shot', name: 'Double Shot', price: 2.50 },
    { guid: 'mod-decaf', name: 'Decaf', price: 0 },
  ],
};

// ============================================================
// SWEETENER
// ============================================================
const sweetenerChoice: ModifierGroupDefault = {
  guid: 'mod-sweetener',
  name: 'Sweetener',
  required: false,
  minSelections: 0,
  maxSelections: 1,
  options: [
    { guid: 'mod-sweet-none', name: 'No Sweetener', price: 0 },
    { guid: 'mod-sweet-honey', name: 'Honey', price: 0 },
    { guid: 'mod-sweet-agave', name: 'Agave', price: 0 },
    { guid: 'mod-sweet-vanilla', name: 'Vanilla Syrup', price: 0.75 },
    { guid: 'mod-sweet-caramel', name: 'Caramel Syrup', price: 0.75 },
  ],
};

// ============================================================
// TEMPERATURE
// ============================================================
const temperatureChoice: ModifierGroupDefault = {
  guid: 'mod-temperature',
  name: 'Temperature',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { guid: 'mod-temp-hot', name: 'Hot', price: 0, isDefault: true },
    { guid: 'mod-temp-iced', name: 'Iced', price: 0 },
  ],
};

// ============================================================
// TOPPINGS (for bowls)
// ============================================================
const bowlToppings: ModifierGroupDefault = {
  guid: 'mod-bowl-toppings',
  name: 'Extra Toppings',
  required: false,
  minSelections: 0,
  maxSelections: 4,
  options: [
    { guid: 'mod-top-granola', name: 'Extra Granola', price: 1.00 },
    { guid: 'mod-top-banana', name: 'Extra Banana', price: 0.75 },
    { guid: 'mod-top-peanutbutter', name: 'Peanut Butter', price: 1.50 },
    { guid: 'mod-top-coconut', name: 'Coconut Flakes', price: 0.75 },
    { guid: 'mod-top-chia', name: 'Chia Seeds', price: 0.75 },
    { guid: 'mod-top-hemp', name: 'Hemp Hearts', price: 1.00 },
    { guid: 'mod-top-honey', name: 'Extra Honey', price: 0.50 },
  ],
};

// ============================================================
// SMOOTHIE ADD-INS
// ============================================================
const smoothieAddIns: ModifierGroupDefault = {
  guid: 'mod-smoothie-addins',
  name: 'Add-Ins',
  required: false,
  minSelections: 0,
  maxSelections: 3,
  options: [
    { guid: 'mod-addin-protein', name: 'Protein Powder', price: 2.00 },
    { guid: 'mod-addin-collagen', name: 'Collagen', price: 2.00 },
    { guid: 'mod-addin-spirulina', name: 'Spirulina', price: 1.50 },
    { guid: 'mod-addin-flaxseed', name: 'Flaxseed', price: 0.75 },
    { guid: 'mod-addin-ginger', name: 'Fresh Ginger', price: 0.75 },
  ],
};

// ============================================================
// BREAD CHOICE (for toasts)
// ============================================================
const breadChoice: ModifierGroupDefault = {
  guid: 'mod-bread',
  name: 'Bread',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { guid: 'mod-bread-sourdough', name: 'Sourdough', price: 0, isDefault: true },
    { guid: 'mod-bread-multigrain', name: 'Multigrain', price: 0 },
    { guid: 'mod-bread-gf', name: 'Gluten-Free (+$2)', price: 2.00 },
  ],
};

// ============================================================
// TOAST ADD-ONS
// ============================================================
const toastAddOns: ModifierGroupDefault = {
  guid: 'mod-toast-addons',
  name: 'Add-Ons',
  required: false,
  minSelections: 0,
  maxSelections: 3,
  options: [
    { guid: 'mod-addon-egg', name: 'Fried Egg', price: 2.00 },
    { guid: 'mod-addon-bacon', name: 'Turkey Bacon', price: 3.00 },
    { guid: 'mod-addon-avocado', name: 'Extra Avocado', price: 2.50 },
    { guid: 'mod-addon-cheese', name: 'Feta Cheese', price: 1.50 },
  ],
};

// ============================================================
// ITEM → MODIFIER GROUP MAPPING
// ============================================================

/**
 * Category-based keywords that determine which modifier groups
 * are assigned to a given menu item.
 */
const LATTE_KEYWORDS = [
  'latte',
  'mocha',
  'cappuccino',
  'macchiato',
  'cortado',
  'espresso fusion',
];

const MATCHA_KEYWORDS = ['matcha'];
const TEA_KEYWORDS = ['chai', 'tea', 'london fog', 'turmeric', 'golden latte'];
const COLD_BREW_KEYWORDS = ['cold brew'];
const BOWL_KEYWORDS = ['bowl'];
const SMOOTHIE_KEYWORDS = ['smoothie', 'mango tango', 'berry blast', 'green machine', 'pb & banana'];
const TOAST_FOOD_KEYWORDS = ['toast', 'sandwich', 'burrito', 'wrap'];

function nameMatches(name: string, keywords: string[]): boolean {
  const lower = name.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

/**
 * Returns the appropriate modifier groups for a menu item based
 * on its name. Items that don't match any category get an empty array.
 */
export function getModifiersForItem(itemName: string, _groupName?: string): ModifierGroupDefault[] {
  if (nameMatches(itemName, LATTE_KEYWORDS)) {
    return [milkChoice, sizeChoice, espressoShots, sweetenerChoice, temperatureChoice];
  }

  if (nameMatches(itemName, MATCHA_KEYWORDS)) {
    return [milkChoice, sizeChoice, sweetenerChoice, temperatureChoice];
  }

  if (nameMatches(itemName, TEA_KEYWORDS)) {
    return [milkChoice, sizeChoice, sweetenerChoice, temperatureChoice];
  }

  if (nameMatches(itemName, COLD_BREW_KEYWORDS)) {
    return [sizeChoice, sweetenerChoice];
  }

  if (nameMatches(itemName, BOWL_KEYWORDS)) {
    return [bowlToppings];
  }

  if (nameMatches(itemName, SMOOTHIE_KEYWORDS)) {
    return [sizeChoice, smoothieAddIns];
  }

  if (nameMatches(itemName, TOAST_FOOD_KEYWORDS)) {
    return [breadChoice, toastAddOns];
  }

  return [];
}

// Re-export individual groups for direct access if needed
export {
  milkChoice,
  sizeChoice,
  espressoShots,
  sweetenerChoice,
  temperatureChoice,
  bowlToppings,
  smoothieAddIns,
  breadChoice,
  toastAddOns,
};
