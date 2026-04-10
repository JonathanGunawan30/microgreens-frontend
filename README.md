# MicroGreens Frontend

MicroGreens is a feature-rich, microservices-ready e-commerce platform for vegetables and groceries, built with **Nuxt 3**, **Pinia**, and **Tailwind CSS**. Designed for scalability, it features independent API configurations for its core modules: Users, Products, Orders, Payments, and Notifications.

---

## 🚀 Features

### 🛒 Customer-Facing (Shop)
- **Product Catalog:** Comprehensive product listing with category filtering and search.
- **Product Details:** High-quality image gallery, detailed descriptions, and pricing.
- **Shopping Cart:** Real-time cart management (add, update, remove items).
- **Checkout Flow:** Integrated checkout process with address management and payment simulation.
- **Account Management:**
  - Secure Authentication (Sign-in, Sign-up, Password Recovery, Account Verification).
  - Profile Management & Settings.
  - Real-time Notifications (WebSockets).
  - Order History & Tracking.

### 🛠️ Admin Dashboard
- **Overview Analytics:** Real-time data and system insights.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) for products and inventory.
- **Category Management:** Manage grocery categories and classifications.
- **Customer Management:** Oversee user accounts and roles.
- **Order Management:** Track and update order statuses across the platform.
- **Role & Permission Management:** Define and assign system-wide user roles.
- **System Notifications:** Send and manage platform-wide alerts.

---

## 🛠️ Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/) (Vue.js)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Nuxt UI](https://ui.nuxt.com/)
- **Icons:** [Nuxt Icon](https://nuxt.com/modules/icon) (Tabler, Iconify, Heroicons)
- **Utilities:** [VueUse](https://vueuse.org/), [Day.js](https://day.js.org/), [SweetAlert2](https://sweetalert2.github.io/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Additional:** Nuxt Content, Swiper, Quill, Simplebar, Dropzone.

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your local development environment.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JonathanGunawan30/MicroGreens-Frontend.git
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

### Environment Setup

1. **Create an environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure the API Base URLs:**
   Open `.env` and fill in your microservice endpoints:
   ```env
   NUXT_USER_API_BASE_URL=http://your-user-api/api/v1
   NUXT_ORDER_API_BASE_URL=http://your-order-api/api/v1
   NUXT_PRODUCT_API_BASE_URL=http://your-product-api/api/v1
   NUXT_PAYMENT_API_BASE_URL=http://your-payment-api/api/v1
   NUXT_NOTIFICATION_API_BASE_URL=http://your-notification-api/api/v1
   ```

### Running Development Server

Start the development server with Hot Module Replacement (HMR):
```bash
bun run dev
```
The application will be available at `http://localhost:3000`.

---

## 🏗️ Building for Production

1. **Generate the production build:**
   ```bash
   bun run build
   ```

2. **Preview the production build:**
   ```bash
   bun run preview
   ```

---

## 📂 Project Structure

- `components/`: Reusable Vue components (Admin, Common, Home, Modals).
- `pages/`: Nuxt application routing (Shop, Dashboard, Auth, Account).
- `stores/`: Pinia state management for each module.
- `composables/`: Reusable logic and WebSocket hooks.
- `middleware/`: Auth and Admin route protection.
- `assets/`: Theme CSS, JS, and global images.
- `public/`: Static files and assets.

---
