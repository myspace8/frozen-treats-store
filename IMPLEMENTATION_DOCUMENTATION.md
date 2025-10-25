# Frozen Treats E-Commerce Platform - Implementation Documentation

## Project Overview

**Frozen Treats** is a full-stack e-commerce web application for a Ghanaian dessert and beverage shop. The platform enables customers to browse products, manage shopping carts, schedule orders, and purchase through multiple channels (WhatsApp, Hubtel, Bolt Food).

**Tech Stack:**
- Frontend: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- State Management: localStorage (client-side)
- UI Components: shadcn/ui
- Deployment: Vercel

---

## Current Architecture

### 1. Data Models & Structures

#### Product Model (`lib/products.ts`)
\`\`\`typescript
type Product = {
  id: string
  name: string
  category: "Ice Cream" | "Boba Tea" | "Pastries" | "Pancakes" | "Slushy" | "Waffles" | "Popcorn" | "Fruit Juice" | "Spring Roll" | "Jam Roll" | "Cocktails" | "Shawarma"
  price: number (GH₵)
  description: string
  flavors: string[]
  popularity: number (0-100)
  image: string (path to image)
  stock: number (inventory count)
}
\`\`\`

**Current Products:** 40 products across 12 categories
- **Stock Management:** Products show "Out of Stock" badge when stock = 0
- **Pricing:** All prices in Ghana Cedis (GH₵)
- **Popularity:** Used for default sorting

#### Cart Item Model (`lib/cart.ts`)
\`\`\`typescript
type CartItem = {
  product: Product
  quantity: number
}
\`\`\`

**Cart Operations:**
- `getCart()` - Retrieve cart from localStorage
- `addToCart(product, quantity)` - Add/update item
- `removeFromCart(productId)` - Remove item
- `updateCartQuantity(productId, quantity)` - Update quantity
- `clearCart()` - Empty cart
- `getCartTotal()` - Calculate total price
- `getCartCount()` - Get total items

#### Order Model (`lib/orders.ts`)
\`\`\`typescript
type Order = {
  id: string (auto-generated: "order-{timestamp}")
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"
  fulfillmentType: "delivery" | "pickup"
  location: string (delivery/pickup location name)
  estimatedTime: string (e.g., "40-60 min")
  scheduledDateTime?: string (customer's scheduled time)
  createdAt: string (ISO timestamp)
  customerName?: string
  customerPhone?: string
  notes?: string
}
\`\`\`

**Order Operations:**
- `getOrders()` - Retrieve all orders
- `addOrder(order)` - Create new order
- `updateOrderStatus(orderId, status)` - Update status
- `cancelOrder(orderId)` - Cancel pending orders only
- `getOrderById(orderId)` - Retrieve specific order

#### Delivery Location Model (`lib/delivery-locations.ts`)
\`\`\`typescript
type DeliveryLocation = {
  id: string
  name: string
  area: string
  deliveryTime: string (e.g., "40-60 min")
  pickupTime: string (e.g., "5-10 min")
}
\`\`\`

**Current Locations:** 20 delivery locations across Kumasi
- **Pickup Locations:** Only Santasi enabled (others disabled)
- **Delivery Areas:** Central, North, South, East, West Kumasi + Residential areas

**Location Operations:**
- `getSelectedLocation()` - Get user's selected location
- `setSelectedLocation(location)` - Save location to localStorage
- `getFulfillmentType()` - Get "delivery" or "pickup" mode
- `setFulfillmentType(type)` - Save fulfillment type
- `getPickupEstimate()` - Calculate real-time pickup time based on store hours and queue

---

### 2. Page Structure

#### Home Page (`app/page.tsx`)
- **Purpose:** Landing page with welcome message
- **Content:** Simple hero section with "You'll find good stuff here" message
- **Status:** Placeholder - ready for enhancement

#### Menu Page (`app/menu/page.tsx`)
- **Features:**
  - Product grid/list view toggle
  - Category filter with horizontal scroll
  - Advanced filters: price range, popularity, flavors
  - Product detail sheet (mobile: bottom sheet, desktop: dialog)
  - Responsive 2x2 grid on mobile, 3-4 columns on desktop
  - Scroll position restoration using sessionStorage
  - Location modal on first visit

- **Components Used:**
  - `ProductCard` - Individual product display
  - `ProductFilters` - Filter sidebar
  - `ProductDetailSheet` - Product details modal
  - `LocationSelectorModal` - Location selection on first visit

#### Cart Page (`app/cart/page.tsx`)
- **Features:**
  - Cart item management (add/remove/update quantity)
  - Order scheduling with date/time picker
  - Instant vs. scheduled order options
  - Time slot availability with capacity management
  - Location and fulfillment type display
  - Order summary with total calculation
  - Responsive layout (2-column on desktop, 1-column on mobile)

- **Scheduling Logic:**
  - Business hours: Mon-Sat 9 AM - 9 PM, Sun 10 AM - 6 PM
  - 30-minute time slots
  - Capacity per slot: 5 for pickup, 3 for delivery
  - Max 30 days in advance
  - Mock availability tracking in localStorage

- **Checkout Flow:**
  - Single item → Opens PurchaseDrawer
  - Multiple items → Direct WhatsApp message
  - Creates order in localStorage
  - Sends WhatsApp message with order details

#### Orders Page (`app/orders/page.tsx`)
- **Features:**
  - Order history with expandable details
  - Status filtering (all, pending, confirmed, preparing, ready, completed, cancelled)
  - Search by order number or date
  - Dynamic status messages based on order state
  - Reorder button for completed orders
  - Order item details with images and quantities
  - Location and scheduled time display

- **Status Messages:**
  - **Pending:** "Awaiting confirmation. We'll update you via WhatsApp."
  - **Confirmed:** "Order confirmed. We're preparing it now."
  - **Preparing:** "Being prepared. We'll notify you when ready."
  - **Ready:** "Ready! Proceed to pick up or wait for delivery."
  - **Completed:** "Thank you! We hope you enjoyed your meal."
  - **Cancelled:** "Order cancelled. Contact us via WhatsApp if you have questions."

#### Deals Page (`app/deals/page.tsx`)
- **Status:** Placeholder - ready for implementation
- **Planned Features:** Promotional offers, discounts, bundle deals

#### Help Page (`app/help/page.tsx`)
- **Status:** Exists but content not detailed in current implementation

---

### 3. Key Components

#### ProductCard (`components/product-card.tsx`)
- Displays product image, name, price, category
- Shows stock status (out of stock badge)
- Displays delivery/pickup time estimate
- Click to open product detail sheet
- Responsive design for mobile/desktop

#### ProductDetailSheet (`app/menu/page.tsx` - ProductDetailSheet component)
- **Mobile:** Bottom sheet with image, details, quantity selector
- **Desktop:** Dialog with side-by-side layout (image + details)
- Shows: Category, price, description, flavors, stock status
- Quantity selector with +/- buttons
- "Add to Cart" button with toast notification

#### PurchaseDrawer (`components/purchase-drawer.tsx`)
- **Mobile:** Bottom drawer
- **Desktop:** Dialog
- Three purchase options:
  1. **WhatsApp** - Direct chat with order details
  2. **Hubtel** - Mobile money payment
  3. **Bolt Food** - Third-party delivery platform
- Creates order in localStorage before redirecting
- Includes scheduled time in WhatsApp message if applicable

#### LocationSelectorModal (`components/location-selector-modal.tsx`)
- **Modes:** Delivery or Pickup
- **Features:**
  - Searchable location list
  - Grouped by area
  - Shows delivery/pickup times
  - Pickup mode only shows enabled locations (Santasi)
  - Saves selection to localStorage
  - Dispatches custom event for other components to listen

#### DeliveryLocationHeader (`components/delivery-location-header.tsx`)
- Displays "Delivering to" or "Pickup at" with location name
- Dropdown arrow to change location
- Opens LocationSelectorModal on click
- Updates in real-time when location changes

#### ProductFilters (`components/product-filters.tsx`)
- **Filter Options:**
  - Categories (multi-select)
  - Price range slider
  - Flavors (multi-select)
  - Sort by: Popularity, Price (low-high), Price (high-low)
- Sticky sidebar on desktop
- Mobile-friendly implementation

---

### 4. State Management

**All state is managed via localStorage (client-side only):**

| Key | Type | Purpose |
|-----|------|---------|
| `cart` | JSON | Current shopping cart items |
| `frozen-treats-delivery-location` | JSON | Selected delivery/pickup location |
| `frozen-treats-fulfillment-type` | String | "delivery" or "pickup" |
| `frozen-treats-orders` | JSON | Order history |
| `homeScrollPosition` | Number | Homepage scroll position for restoration |
| `mockAvailability` | JSON | Mock time slot availability tracking |
| `lastOrderAnalytics` | JSON | Analytics data for last order |

**Custom Events for Cross-Component Communication:**
- `cartUpdated` - Cart changed
- `locationUpdated` - Location changed
- `fulfillmentTypeUpdated` - Fulfillment type changed
- `orderAdded` - New order created
- `orderUpdated` - Order status changed

---

### 5. Current Features

✅ **Implemented:**
- Product catalog with 40 items across 12 categories
- Advanced filtering (category, price, flavors, popularity)
- Shopping cart with quantity management
- Order scheduling with time slots
- Pickup vs. delivery selection
- Real-time pickup time estimates
- Multi-platform checkout (WhatsApp, Hubtel, Bolt Food)
- Order history with status tracking
- Dynamic status messages
- Reorder functionality
- Stock availability display
- Responsive mobile-first design
- Scroll position restoration
- Location-based delivery times

❌ **Not Yet Implemented:**
- User authentication
- Payment processing (direct integration)
- Real backend database
- Admin dashboard
- Deals/promotions system
- User profiles
- Order notifications
- Analytics dashboard
- Inventory management system

---

## Backend Implementation Guide (Supabase)

### Recommended Database Schema

#### Products Table
\`\`\`sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  flavors TEXT[] DEFAULT '{}',
  popularity INT DEFAULT 0,
  image_url VARCHAR(500),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_stock ON products(stock);
\`\`\`

#### Orders Table
\`\`\`sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  fulfillment_type VARCHAR(10) NOT NULL,
  location_id UUID REFERENCES delivery_locations(id),
  scheduled_datetime TIMESTAMP,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
\`\`\`

#### Order Items Table
\`\`\`sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
\`\`\`

#### Delivery Locations Table
\`\`\`sql
CREATE TABLE delivery_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  area VARCHAR(100),
  delivery_time VARCHAR(50),
  pickup_time VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_delivery_locations_active ON delivery_locations(is_active);
\`\`\`

#### Cart Table (Optional - for persistent carts)
\`\`\`sql
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_carts_user_id ON carts(user_id);
\`\`\`

### Migration Strategy

1. **Phase 1:** Move products to Supabase
   - Create products table
   - Migrate 40 products from hardcoded data
   - Update `lib/products.ts` to fetch from Supabase

2. **Phase 2:** Move orders to Supabase
   - Create orders and order_items tables
   - Migrate existing localStorage orders
   - Update `lib/orders.ts` to use Supabase

3. **Phase 3:** Add authentication
   - Implement Supabase Auth
   - Link orders to user accounts
   - Add user profiles

4. **Phase 4:** Real-time features
   - Order status updates via Supabase Realtime
   - Inventory sync
   - Notification system

---

## Pages to Implement

### 1. Home Page Enhancement
- **Current:** Placeholder
- **Planned:**
  - Featured products carousel
  - Category highlights
  - Customer testimonials
  - Call-to-action buttons
  - Location/hours info

### 2. Deals Page
- **Current:** Placeholder
- **Planned:**
  - Promotional offers
  - Bundle deals
  - Seasonal specials
  - Discount codes
  - Limited-time offers

### 3. Profile Page
- **Planned:**
  - User account info
  - Order history (alternative view)
  - Saved addresses
  - Preferences
  - Loyalty points (future)

### 4. Admin Dashboard
- **Planned:**
  - Order management
  - Product inventory
  - Sales analytics
  - Customer management
  - Promotion management

---

## Integration Points

### WhatsApp Integration
- **Current:** Direct link to WhatsApp chat
- **Phone:** +233592771234
- **Message Format:** Order details with items, location, scheduled time, total
- **Future:** WhatsApp Business API for automated responses

### Hubtel Integration
- **Current:** Redirect to Hubtel shop
- **URL Pattern:** `https://hubtel.com/shop/frozen-treats/{productId}`
- **Future:** Direct payment integration

### Bolt Food Integration
- **Current:** Redirect to Bolt Food
- **URL Pattern:** `https://food.bolt.eu/frozen-treats/{productId}`
- **Future:** API integration for real-time sync

---

## Performance Considerations

1. **Image Optimization:**
   - Use Next.js Image component (already implemented)
   - Placeholder images: `/placeholder.svg?height=400&width=400&query={description}`
   - Lazy loading for product images

2. **State Management:**
   - localStorage for cart/orders (no server calls)
   - Custom events for cross-component updates
   - Efficient re-renders with React hooks

3. **Responsive Design:**
   - Mobile-first approach
   - Breakpoints: md (768px), lg (1024px)
   - Touch-friendly buttons and inputs

---

## Security Considerations

### Current (Client-Side Only)
- No sensitive data exposure
- localStorage is domain-specific
- No authentication required

### Future (With Backend)
- Implement Row-Level Security (RLS) in Supabase
- Validate orders on backend
- Secure payment processing
- Rate limiting on API endpoints
- Input validation and sanitization

---

## Testing Recommendations

1. **Unit Tests:**
   - Cart operations (add, remove, update)
   - Order creation and status updates
   - Location selection logic

2. **Integration Tests:**
   - Complete checkout flow
   - Order scheduling validation
   - Multi-platform purchase options

3. **E2E Tests:**
   - Browse → Add to Cart → Checkout → Order Confirmation
   - Location selection → Delivery time calculation
   - Order history filtering and search

---

## Deployment Notes

- **Platform:** Vercel (recommended for Next.js)
- **Environment Variables Needed:**
  - `NEXT_PUBLIC_SUPABASE_URL` (when migrating to Supabase)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (when migrating to Supabase)
  - `WHATSAPP_PHONE_NUMBER` (for WhatsApp integration)

---

## Future Enhancements

1. **User Authentication** - Supabase Auth
2. **Payment Integration** - Stripe, MTN Mobile Money
3. **Real-time Notifications** - Order status updates
4. **Loyalty Program** - Points and rewards
5. **Analytics Dashboard** - Sales, customer insights
6. **Admin Panel** - Inventory, order management
7. **Mobile App** - React Native version
8. **AI Recommendations** - Product suggestions
9. **Review System** - Customer ratings and feedback
10. **Subscription Boxes** - Recurring orders

---

## File Structure Reference

\`\`\`
frozen-treats-store/
├── app/
│   ├── page.tsx (Home)
│   ├── menu/page.tsx (Menu/Products)
│   ├── cart/page.tsx (Shopping Cart)
│   ├── orders/page.tsx (Order History)
│   ├── deals/page.tsx (Deals)
│   ├── help/page.tsx (Help)
│   ├── product/[id]/page.tsx (Product Detail)
│   ├── layout.tsx (Root Layout)
│   └── globals.css (Global Styles)
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── product-card.tsx
│   ├── product-filters.tsx
│   ├── product-detail-client.tsx
│   ├── purchase-drawer.tsx
│   ├── delivery-location-header.tsx
│   ├── location-selector-modal.tsx
│   ├── contact-form.tsx
│   ├── location-hours.tsx
│   └── ui/ (shadcn components)
├── lib/
│   ├── products.ts (Product data & types)
│   ├── cart.ts (Cart management)
│   ├── orders.ts (Order management)
│   ├── delivery-locations.ts (Location data & logic)
│   └── utils.ts (Utility functions)
├── hooks/
│   ├── use-toast.ts
│   ├── use-mobile.ts
│   └── use-media-query.ts
├── public/
│   ├── images/ (Product images)
│   └── categories-filter-icons/ (Category icons)
└── package.json
\`\`\`

---

## Contact & Support

- **WhatsApp:** +233592771234
- **Location:** Santasi, Kumasi, Ghana (near Opoku Ware School)
- **Hours:** Mon-Sat 9 AM - 9 PM, Sun 10 AM - 6 PM

---

**Last Updated:** October 2025
**Version:** 1.0
**Status:** Production Ready (Client-Side)
