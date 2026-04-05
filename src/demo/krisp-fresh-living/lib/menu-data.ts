// ============================================================
// KRISP FRESH LIVING — Menu Data & Location Helpers
// Exact conversion from Next.js original with inline mock data
// ============================================================

import { getModifiersForItem } from './modifier-defaults';

// ============================================================
// TYPES — matching original JSON structure
// ============================================================

export interface MenuItem {
  guid: string;
  name: string;
  description: string;
  prices: number[];
  imageUrl: string | null;
  hasModifiers: boolean;
  outOfStock: boolean;
  modifierGroups: any[];
}

export interface MenuGroup {
  guid: string;
  name: string;
  items: MenuItem[];
  menuName?: string;
}

export interface Menu {
  name: string;
  groups: MenuGroup[];
}

export interface LocationHours {
  [key: string]: string;
}

export interface Location {
  id: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  phone: string;
  lat: number;
  lng: number;
  hours: LocationHours;
}

// ============================================================
// LOCATIONS
// ============================================================

export const LOCATIONS: Location[] = [
  {
    id: 'michelson',
    name: 'KRISP Fresh Living',
    shortName: 'Michelson',
    address: '2272 Michelson Dr. Suite 100',
    city: 'Irvine, CA 92612',
    phone: '(949) 536-5735',
    lat: 33.6846,
    lng: -117.8265,
    hours: {
      'Monday - Friday': '7:00 AM - 7:00 PM',
      'Saturday & Sunday': '9:00 AM - 5:00 PM',
    },
  },
  {
    id: 'alton',
    name: 'KRISP Alton',
    shortName: 'Alton',
    address: '15635 Alton Parkway',
    city: 'Irvine, CA 92618',
    phone: '(949) 639-9891',
    lat: 33.656228,
    lng: -117.753814,
    hours: {
      'Monday - Friday': '7:00 AM - 5:00 PM',
      'Saturday': '8:00 AM - 1:00 PM',
    },
  },
];

// ============================================================
// MOCK MENUS — mirrors original { menus: [ { name, groups } ] }
// ============================================================

const MOCK_MENUS: Menu[] = [
  {
    name: 'Drinks',
    groups: [
      {
        guid: 'grp-specialty-lattes',
        name: 'Specialty Lattes',
        items: [
          { guid: 'item-cardamom-rose-latte', name: 'Cardamom Rose Latte', description: 'Warm cardamom and delicate rose water blended with espresso and steamed milk.', prices: [6.75], imageUrl: 'https://d1w7312wesee68.cloudfront.net/pYxrYf8-kEXeoXBmlXWC1CoA2BUPuAjSH2uKLoNtIiM/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/47873e3a-dee7-4435-8877-8414626e4655.jpg', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-lavender-latte', name: 'Lavender Latte', description: 'Espresso with house-made lavender syrup, steamed milk, and a touch of vanilla.', prices: [6.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/ykMzQFj_uqchqBfJ7TIPoluXHsvgcWlcUfMqUBWWubQ/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/c71f70e0-3fdf-441b-9caa-fbae5541900c.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-honey-cinnamon-latte', name: 'Honey Cinnamon Latte', description: 'Smooth espresso paired with local honey, cinnamon, and steamed oat milk.', prices: [6.75], imageUrl: 'https://d1w7312wesee68.cloudfront.net/JRGnsQTXLszxBB3GoMzAvC5b0Lm9kAfz8grUScYxTW0/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/25243fdc-6202-4369-9090-02461e726dc7.jpg', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-brown-sugar-latte', name: 'Brown Sugar Oat Latte', description: 'Rich espresso with brown sugar syrup and creamy oat milk, topped with caramelized sugar.', prices: [6.75], imageUrl: 'https://d1w7312wesee68.cloudfront.net/jMQyyyV7IIQJx3APzQw72fE2QQgDSxHmJLvOhfuwRpQ/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/d151ee8c-75f8-4f73-9ec7-24eb476e7e06.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-pistachio-latte', name: 'Pistachio Latte', description: 'House-made pistachio cream with espresso and steamed milk.', prices: [7.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/iTxcV9phE2uE08fDeA5CqZiTNvb87eLdIYakvkuOvtA/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/6f228a11-2a44-43d2-bbbe-25ced4a51232.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-vanilla-latte', name: 'Vanilla Latte', description: 'Classic espresso with Madagascar vanilla and steamed milk.', prices: [6.25], imageUrl: 'https://d1w7312wesee68.cloudfront.net/zXbOpHFKtHZWl_Ntg-iL4mPokpcJGvOljcQwbqIlskM/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/26999215-e078-4b57-a932-0da97536b467.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-hazelnut-mocha', name: 'Hazelnut Mocha', description: 'Espresso with dark chocolate, hazelnut, and steamed milk topped with cocoa.', prices: [7.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/iTxcV9phE2uE08fDeA5CqZiTNvb87eLdIYakvkuOvtA/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/6f228a11-2a44-43d2-bbbe-25ced4a51232.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-caramel-macchiato', name: 'Caramel Macchiato', description: 'Vanilla-sweetened milk marked with espresso and drizzled with buttery caramel.', prices: [6.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/zXbOpHFKtHZWl_Ntg-iL4mPokpcJGvOljcQwbqIlskM/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/26999215-e078-4b57-a932-0da97536b467.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
        ],
      },
      {
        guid: 'grp-matcha-series',
        name: 'Matcha Series',
        items: [
          { guid: 'item-signature-matcha', name: 'Signature Matcha', description: 'Ceremonial-grade matcha whisked with your choice of milk.', prices: [6.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/91PRkcSDE0FhVGRnjwLcRpp2Lw1PvPK-Wh9Y3WGinPI/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/fd88da7b-7324-4032-b125-deadce2fa504.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-iced-matcha', name: 'Iced Matcha', description: 'Chilled ceremonial matcha over ice with oat milk.', prices: [6.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/8XlhSA4zC_uWfCTtPokiLeVQPegzk-qV4ltmuTqOb5Y/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/73fdc8a8-b70f-467e-9926-cd4f70362626.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-matcha-mint', name: 'Matcha Mint', description: 'Fresh mint muddled with ceremonial matcha and oat milk.', prices: [7.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/e1m071RWivtR-LIJ2C9WUPVXn8VhCqBIgF_rs1PGzi0/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/5f4ffee8-293d-447a-93c6-5e1036995324.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-strawberry-matcha', name: 'Strawberry Matcha', description: 'House-made strawberry puree layered with matcha and milk.', prices: [7.25], imageUrl: 'https://d1w7312wesee68.cloudfront.net/HGVC6DOQ9opq-6F69K7hC_KFkmc8YUgVsyD-DDLxTLw/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/19539454-49fa-4f6a-bab2-7edcf6bd61ed.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-matcha-espresso-fusion', name: 'Matcha Espresso Fusion', description: 'The best of both worlds — matcha and a shot of espresso over iced oat milk.', prices: [7.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/VeCEp8h58W_TjDZs4fteZRixXr8CnmRcuh-z0WPncHY/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/13fc66c5-e367-4bc6-85fc-12a8cbf3b697.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
        ],
      },
      {
        guid: 'grp-drip-cold-brew',
        name: 'Drip & Cold Brew',
        items: [
          { guid: 'item-drip-coffee', name: 'Drip Coffee', description: 'Single-origin, freshly brewed drip coffee.', prices: [3.50, 4.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/gai9KzgdSgWzMAgh6wip0nyEviU6cOKZH4PPHn4oG4A/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-98633000000000000/menu/items/9/item-600000042173429769_1753921990.jpg', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-cold-brew', name: 'Cold Brew', description: 'Slow-steeped for 20 hours, smooth and rich.', prices: [5.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/fxL4WdtkNk6BZlu-9HVO8nUIa3hhkQ0WkY06hKz-wag/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/fa7eacf7-c88a-4c6d-bcc8-2390945113f2.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-nitro-cold-brew', name: 'Nitro Cold Brew', description: 'Our signature cold brew infused with nitrogen for a creamy, velvety finish.', prices: [6.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/APozuMtfwxjZnOPz7h6cc5I2uWfyw_GnZPo7V0PLbKk/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/c45f1253-896f-48a0-a409-fd9dc2240104.png', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-vanilla-cold-brew', name: 'Vanilla Sweet Cream Cold Brew', description: 'Cold brew topped with house-made vanilla sweet cream.', prices: [6.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/mVbCqgdMxRBLi7QsW4zNQ3iHLUi4RGJmIRsMtyuZYWY/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/8d213fe4-c8bc-4405-9908-a3553c1039a7.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
        ],
      },
      {
        guid: 'grp-tea',
        name: 'Tea',
        items: [
          { guid: 'item-chai-latte', name: 'Chai Latte', description: 'House-spiced chai concentrate with steamed milk.', prices: [5.75], imageUrl: 'https://d1w7312wesee68.cloudfront.net/JRGnsQTXLszxBB3GoMzAvC5b0Lm9kAfz8grUScYxTW0/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/25243fdc-6202-4369-9090-02461e726dc7.jpg', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-london-fog', name: 'London Fog', description: 'Earl Grey tea with vanilla and steamed milk.', prices: [5.75], imageUrl: 'https://d1w7312wesee68.cloudfront.net/ykMzQFj_uqchqBfJ7TIPoluXHsvgcWlcUfMqUBWWubQ/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/c71f70e0-3fdf-441b-9caa-fbae5541900c.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-hot-tea', name: 'Hot Tea', description: 'Selection of premium loose-leaf teas — green, chamomile, peppermint, or English breakfast.', prices: [4.00], imageUrl: null, hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-iced-tea', name: 'Fresh Iced Tea', description: 'House-brewed black or green tea, served over ice.', prices: [4.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/8XlhSA4zC_uWfCTtPokiLeVQPegzk-qV4ltmuTqOb5Y/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/73fdc8a8-b70f-467e-9926-cd4f70362626.png', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-turmeric-latte', name: 'Turmeric Golden Latte', description: 'Organic turmeric, ginger, black pepper, and honey with steamed oat milk.', prices: [6.25], imageUrl: 'https://d1w7312wesee68.cloudfront.net/jMQyyyV7IIQJx3APzQw72fE2QQgDSxHmJLvOhfuwRpQ/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/d151ee8c-75f8-4f73-9ec7-24eb476e7e06.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
        ],
      },
    ],
  },
  {
    name: 'Food',
    groups: [
      {
        guid: 'grp-bowls',
        name: 'Bowls',
        items: [
          { guid: 'item-classic-acai-bowl', name: 'Classic Acai Bowl', description: 'Blended acai topped with granola, banana, strawberries, blueberries, and honey.', prices: [13.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/sinsMOovsOISMY_h2H9k-MXQgfJ7T1gYJAfjzV2eVPQ/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/06f48108-9b29-4c03-b44b-bbf31807487d.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-green-bowl', name: 'Green Smoothie Bowl', description: 'Spinach, banana, mango, and coconut milk topped with chia seeds and fresh fruit.', prices: [13.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/FgD_90ibwkl7J3CMvQF0Q32dzw0fGfkdKYlmWqNoy78/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/46bb6f70-6695-475b-97f7-86a41bf4a6d8.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-pitaya-bowl', name: 'Pitaya Bowl', description: 'Dragon fruit blended with coconut milk, topped with granola, kiwi, and coconut flakes.', prices: [14.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/sinsMOovsOISMY_h2H9k-MXQgfJ7T1gYJAfjzV2eVPQ/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/06f48108-9b29-4c03-b44b-bbf31807487d.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-protein-bowl', name: 'Protein Power Bowl', description: 'Peanut butter, banana, chocolate protein, oat milk, topped with granola and almonds.', prices: [14.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/B_LTxhxDO0T2DsekHDEi_6D_lHu33_zneKZj_5isXGY/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/a2034999-30cb-4886-987a-252bb5868d62.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
        ],
      },
      {
        guid: 'grp-smoothies',
        name: 'Smoothies',
        items: [
          { guid: 'item-mango-tango', name: 'Mango Tango', description: 'Mango, pineapple, banana, and coconut milk blended smooth.', prices: [9.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/FgD_90ibwkl7J3CMvQF0Q32dzw0fGfkdKYlmWqNoy78/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/46bb6f70-6695-475b-97f7-86a41bf4a6d8.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-berry-blast', name: 'Berry Blast', description: 'Strawberry, blueberry, raspberry, banana, and almond milk.', prices: [9.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/HGVC6DOQ9opq-6F69K7hC_KFkmc8YUgVsyD-DDLxTLw/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/19539454-49fa-4f6a-bab2-7edcf6bd61ed.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-green-machine', name: 'Green Machine', description: 'Spinach, kale, banana, pineapple, ginger, and apple juice.', prices: [10.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/FgD_90ibwkl7J3CMvQF0Q32dzw0fGfkdKYlmWqNoy78/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/46bb6f70-6695-475b-97f7-86a41bf4a6d8.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-pb-banana', name: 'PB & Banana', description: 'Peanut butter, banana, oat milk, honey, and a hint of cinnamon.', prices: [9.75], imageUrl: 'https://d1w7312wesee68.cloudfront.net/P8hmzbgdx99Ws_yFHRM_ncvZ58T1_eMIy7xflDCsK3s/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-98633000000000000/menu/items/5/item-600000025667749615_1715107488.jpg', hasModifiers: true, outOfStock: false, modifierGroups: [] },
        ],
      },
      {
        guid: 'grp-toast-food',
        name: 'Toast & Fresh Food',
        items: [
          { guid: 'item-avocado-toast', name: 'Avocado Toast', description: 'Smashed avocado on sourdough with everything seasoning, red pepper flakes, and microgreens.', prices: [12.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/nV0SLebbQiAc4soIsSdNsXGA_0MWbHBeJeQvgu9ZNkM/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/9d1d26da-8217-4bff-93b8-b5fa7df10c67.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-salmon-toast', name: 'Smoked Salmon Toast', description: 'Cream cheese, smoked salmon, capers, red onion, and dill on sourdough.', prices: [14.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/nV0SLebbQiAc4soIsSdNsXGA_0MWbHBeJeQvgu9ZNkM/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/9d1d26da-8217-4bff-93b8-b5fa7df10c67.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-breakfast-burrito', name: 'Breakfast Burrito', description: 'Scrambled eggs, cheese, avocado, black beans, and salsa in a flour tortilla.', prices: [12.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/-0HxrCHctuvTZNn1opYdVpu7WRAWl6MlEzEZKwpgDvk/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/1e47aa5a-66fd-4b05-b9af-2ad8a0bcda10.png', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-egg-sandwich', name: 'Egg Sandwich', description: 'Cage-free eggs, cheddar, arugula, and herb aioli on a brioche bun.', prices: [11.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/q924Wz-FLBEPBGXnb8Tr-WS7tIZwWsjd0Bh0hHGZ1yE/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/ca18a23b-29a9-435f-a4a1-843fca1345f5.jpg', hasModifiers: true, outOfStock: false, modifierGroups: [] },
          { guid: 'item-turkey-club', name: 'Turkey Club Wrap', description: 'Roasted turkey, bacon, avocado, lettuce, tomato, and ranch in a spinach wrap.', prices: [13.50], imageUrl: null, hasModifiers: true, outOfStock: false, modifierGroups: [] },
        ],
      },
      {
        guid: 'grp-pastries',
        name: 'Pastries',
        items: [
          { guid: 'item-butter-croissant', name: 'Butter Croissant', description: 'Flaky, golden French-style croissant baked fresh daily.', prices: [4.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/Dy2ISHKlsBpGsQoIPaglOA5vfO6Y6RNj29xXMPENHuE/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/4b2da0b3-964f-4e9f-95a5-24099b156962.jpg', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-almond-croissant', name: 'Almond Croissant', description: 'Butter croissant filled with almond cream and topped with sliced almonds.', prices: [5.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/q924Wz-FLBEPBGXnb8Tr-WS7tIZwWsjd0Bh0hHGZ1yE/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/ca18a23b-29a9-435f-a4a1-843fca1345f5.jpg', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-banana-bread', name: 'Banana Bread', description: 'Moist, house-baked banana bread with walnuts.', prices: [4.75], imageUrl: 'https://d1w7312wesee68.cloudfront.net/P8hmzbgdx99Ws_yFHRM_ncvZ58T1_eMIy7xflDCsK3s/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-98633000000000000/menu/items/5/item-600000025667749615_1715107488.jpg', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-blueberry-muffin', name: 'Blueberry Muffin', description: 'Fresh blueberries baked into a light, fluffy muffin with streusel topping.', prices: [4.50], imageUrl: 'https://d1w7312wesee68.cloudfront.net/jZQGlozl4Y8Dk3VR09oCEHCOPodxXeV1xMrO2yRyT-Y/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/75f4c1bc-2415-4269-a975-8c6a15648150.jpg', hasModifiers: false, outOfStock: false, modifierGroups: [] },
        ],
      },
      {
        guid: 'grp-grab-go',
        name: 'Grab & Go',
        items: [
          { guid: 'item-overnight-oats', name: 'Overnight Oats', description: 'Rolled oats soaked with oat milk, chia seeds, and topped with seasonal fruit.', prices: [8.50], imageUrl: null, hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-protein-bites', name: 'Protein Energy Bites', description: 'Oats, peanut butter, honey, dark chocolate chips, and flaxseed. Pack of 4.', prices: [6.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/z66emhvzzkWSKPCzSt0bxh09Q0RaL0tVkmGgMlnyfDg/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/b2a64aa6-eb9a-49ee-8348-a7668db7a6bd.png', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-chia-pudding', name: 'Chia Pudding', description: 'Coconut milk chia pudding layered with mango puree and granola.', prices: [8.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/zXbOpHFKtHZWl_Ntg-iL4mPokpcJGvOljcQwbqIlskM/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/26999215-e078-4b57-a932-0da97536b467.png', hasModifiers: false, outOfStock: false, modifierGroups: [] },
          { guid: 'item-fresh-juice', name: 'Fresh Pressed Juice', description: 'Cold-pressed daily. Choose from Green Glow, Citrus Sunrise, or Beet Boost.', prices: [9.00], imageUrl: 'https://d1w7312wesee68.cloudfront.net/T4CAVJ2kgOOhovXZHIKFI25uQGRXM1wACKIdTdqcIHw/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/d11c2344-fdf8-4893-ba62-2ab232619322/MenuItem/7f6c1934-10f2-4709-a414-6dbeec54102a.png', hasModifiers: false, outOfStock: false, modifierGroups: [] },
        ],
      },
    ],
  },
];

// ============================================================
// HELPER FUNCTIONS — matching original signatures exactly
// ============================================================

export function getLocation(id: string): Location {
  return LOCATIONS.find(l => l.id === id) || LOCATIONS[0];
}

export function getMenuForLocation(locationId: string): Menu[] {
  // In mock version all locations share the same menu
  // Enrich items with modifiers just like the original
  getLocation(locationId); // validate location exists
  return MOCK_MENUS.map(menu => ({
    ...menu,
    groups: menu.groups.map(group => ({
      ...group,
      items: group.items.map(item => ({
        ...item,
        modifierGroups: getModifiersForItem(item.name, group.name),
      })),
    })),
  }));
}

export function getAllItems(locationId: string): (MenuItem & { menuName: string; groupName: string })[] {
  const menus = getMenuForLocation(locationId);
  const items: (MenuItem & { menuName: string; groupName: string })[] = [];
  menus.forEach(menu => {
    menu.groups.forEach(group => {
      group.items.forEach(item => {
        items.push({ ...item, menuName: menu.name, groupName: group.name });
      });
    });
  });
  return items;
}

export function getAllGroups(locationId: string): (MenuGroup & { menuName: string })[] {
  const menus = getMenuForLocation(locationId);
  const groups: (MenuGroup & { menuName: string })[] = [];
  menus.forEach(menu => {
    menu.groups.forEach(group => {
      groups.push({ ...group, menuName: menu.name });
    });
  });
  return groups;
}

export function formatPrice(prices: number[]): string {
  if (!prices || prices.length === 0) return '';
  if (prices.length === 1) return `$${prices[0].toFixed(2)}`;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return `$${min.toFixed(2)}`;
  return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
}
