# ShopPlus - Product Management System

ShopPlus is a modern, professional-grade React frontend designed for seamless product management. Inspired by industry-leading e-commerce platforms like Amazon and Flipkart, it provides a clean, high-clarity interface for managing store inventory.

## 🚀 Features

- **Product Catalog**: Clean grid layout with high-performance rendering.
- **Advanced Search**: Debounced search functionality to find products and brands in real-time.
- **Product Details**: Dedicated routing (`/product/:id`) for in-depth product views, featuring high-res images, pricing details, and specifications.
- **Inventory Management**: Complete CRUD (Create, Read, Update, Delete) capabilities.
- **Image Uploads**: Support for multipart/form-data image uploads with real-time previews.
- **Professional UI**: Responsive design with a ShopPlus-branded theme, star ratings, and stock status tracking.
- **Toast Notifications**: Interactive feedback for all system actions.

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **Routing**: React Router Dom
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API Client**: Axios
- **Notifications**: React Hot Toast

## ⚙️ Configuration

The frontend connects to a Spring Boot backend. The API base URL is configured in `src/services/api.js`:

```javascript
export const API_BASE_URL = 'http://localhost:8080/api/product';
```

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aldous-Roy/Spring-E-commerce-client.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 API Structure

The system expects the following backend endpoints:

- `GET /` - Fetch all products
- `GET /{prod_id}` - Fetch single product details
- `GET /search?searchWord={keyword}` - Search products
- `GET /{prod_id}/image` - Fetch product image
- `POST /` - Create new product (Multipart: `newproduct` JSON + `imageFile`)
- `PUT /{prod_id}` - Update product (Multipart: `newproduct` JSON + `imageFile`)
- `DELETE /{prod_id}` - Delete product

---

Developed with ❤️ for Advanced E-commerce Management.
