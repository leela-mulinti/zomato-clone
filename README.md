# Tasty Kitchens (Swiggy / Zomato Clone)

A modern, responsive, production-ready React food delivery application built using functional components, hooks, React Router v6, context-based state management, authentication with JWT cookies, and persistent cart storage in LocalStorage.

---

## 🚀 Features

### 1. Authentication & Authorization
- **Login Route (`/login`)**:
  - Valid credentials: `rahul` / `rahul@2021`
  - Stores `jwt_token` securely using `js-cookie`.
  - Password visibility toggle.
  - Automatically redirects authenticated users away from `/login`.
  - Protected routes (`/`, `/restaurant/:id`, `/cart`, `/profile`) automatically redirect unauthenticated users to `/login`.

### 2. Home Route (`/`)
- **Offers Carousel**:
  - Dynamic offer banners fetched from `https://apis.ccbp.in/restaurants-list/offers`.
  - Powered by `react-slick` slider with autoplay, infinite scroll, and dot indicators.
  - Oval loading indicator (`testid="restaurants-offers-loader"`).
- **Popular Restaurants**:
  - Filter / Sort By Ratings (Lowest to Highest, Highest to Lowest) using `BsFilterLeft` icon from `react-icons/bs`.
  - Default sort option is `Lowest` (imported from `src/App.jsx`).
  - Search functionality: Real-time search by restaurant name.
  - Pagination controls with previous (`testid="pagination-left-button"`), next (`testid="pagination-right-button"`), and active page indicator (`testid="active-page-number"`).
  - Responsive restaurant cards (`testid="restaurant-item"`) with ratings, cuisine tags, and opening status badges.
  - Oval loader (`testid="restaurants-list-loader"`).

### 3. Specific Restaurant Details Route (`/restaurant/:id`)
- Hero banner with restaurant cover image (`alt="restaurant"`), cuisine, location, rating, and cost for two.
- Menu food items grid (`testid="foodItem"`):
  - Veg / Non-Veg badges, price (`FaRupeeSign`), rating, and high-res image.
  - "ADD" button when quantity is 0.
  - Quantity controls with decrement (`testid="decrement-count"` using `HiOutlineMinusSm`), counter (`testid="active-count"`), and increment (`testid="increment-count"` using `BsPlus`).
  - Oval loader (`testid="restaurant-details-loader"`).

### 4. Cart Route (`/cart`)
- Persistent Cart stored in LocalStorage under key `cartData`:
  ```json
  {
    "cost": 345,
    "quantity": 2,
    "id": "c3b24b72-3356-4c26-a2cf-8379eb9053cd",
    "imageUrl": "https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-salad-16.jpg",
    "name": "Chicken Salad"
  }
  ```
- Cart item row (`testid="cartItem"`):
  - Decrement quantity button (`testid="decrement-quantity"`).
  - Quantity value (`testid="item-quantity"`).
  - Increment quantity button (`testid="increment-quantity"`).
  - Item total calculation.
- Total order summary:
  - Total price container (`testid="total-price"`).
  - "Place Order" button.
- **Empty Cart View**:
  - Image with `alt="empty cart"`.
  - "No Order Yet!" message and "Order Now" navigation button.
- **Payment Successful View**:
  - `FaCheckCircle` checkmark icon.
  - "Payment Successful" and "Go To Home" navigation button.
  - Clears `cartData` from LocalStorage upon order placement.

### 5. Stretch Goals & Additional Features
- **Profile Route (`/profile`)**:
  - User details card with profile avatar, email, delivery address, favorite cuisines, and logout.
- **Immediate Restaurant Availability**:
  - Displays opening availability badges on restaurant cards.
- **Search Functionality**:
  - Live restaurant search with "No Restaurants Found" fallback state.

### 6. Responsive Header & Footer
- Sticky Navigation bar with highlighted active links, dynamic cart items count badge, and mobile drawer.
- Comprehensive Footer with all social icons (`testid="pintrest-social-icon"`, `testid="instagram-social-icon"`, `testid="twitter-social-icon"`, `testid="facebook-social-icon"`).

---

## 🛠️ Tech Stack & Requirements Met

| Requirement | Implementation |
|---|---|
| Architecture | Functional components with React Hooks (`useState`, `useEffect`, `useParams`, `useNavigate`, `useLocation`, `useContext`) |
| Styling | Standard CSS stylesheets with CSS custom properties (no CSS-in-JS / styled-components) |
| Loader | `react-loader-spinner` (`Oval` with `color="gold"`, `height={40}`, `width={50}`) |
| Carousel | `react-slick` and `slick-carousel` |
| Icons | `react-icons` (`react-icons/bs`, `react-icons/fa`, `react-icons/hi`, `react-icons/ai`, `react-icons/gi`, `react-icons/fi`) |
| Cookies | `js-cookie` (key: `jwt_token`) |
| LocalStorage | Key: `cartData` |

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
