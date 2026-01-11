
#  Smart Order & Inventory Management System – Angular Frontend

This repository contains the **Angular frontend** for the **Smart Order & Inventory Management System**, designed to interact with a **microservices-based Spring Boot backend**.

The frontend provides:

* Admin dashboards for warehouse & inventory management
* User-facing inventory browsing and cart flow
* Real-time stock awareness (available / low stock)
* Modular, service-driven Angular architecture

---

## 🚀 Tech Stack

* **Angular 17+** (Standalone Components)
* **TypeScript**
* **RxJS**
* **Angular Router**
* **Chart.js** (Admin analytics)
* **HTML5 / CSS3**
* **REST API integration**

---

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── core/
 │   │   ├── models/          # Interfaces & DTOs
 │   │   ├── services/        # API service layer
 │   │   └── guards/          # Route guards (future-ready)
 │
 │   ├── features/
 │   │   ├── admin/
 │   │   │   ├── warehouse/
 │   │   │   │   ├── warehouse-list/
 │   │   │   │   └── warehouse-detail/
 │   │   │   └── inventory-dashboard/
 │   │   │
 │   │   ├── inventory/
 │   │   │   └── inventory-page/
 │   │   │
 │   │   ├── cart/
 │   │   │   └── cart-page/
 │   │   │
 │   │   └── checkout/
 │   │
 │   ├── app.routes.ts
 │   └── app.component.ts
 │
 └── assets/
```

---

## 🧩 Architecture Overview

### 1️⃣ Standalone Component Architecture

* No traditional `NgModule`
* Each component declares its own imports
* Faster builds & better tree-shaking

### 2️⃣ Service Layer (Core)

All backend communication is centralized in services:

| Service            | Responsibility                 |
| ------------------ | ------------------------------ |
| `WarehouseService` | Warehouses CRUD                |
| `InventoryService` | Inventory & stock updates      |
| `ProductService`   | Product metadata               |
| `CartService`      | Cart state & warehouse locking |
| `OrderService`     | Order placement                |

> Components **never** call APIs directly.

---

## 🏭 Admin Features

### 📦 Warehouse Management

* View all warehouses in card layout
* Create warehouse via **modal**
* Navigate to warehouse details

### 📊 Warehouse Detail Page

* Warehouse metadata (ID, location, status)
* Inventory tab
* Low-stock alerts tab
* Add inventory
* Update inventory via modal popup

### ⚠️ Low Stock Alerts

* Consolidated view per warehouse
* Highlighted thresholds

---

## 🛒 User Features

### 🏬 Inventory Browsing

* Warehouse selection dropdown
* Product cards with:

  * Image
  * Price
  * Availability
* Stock-aware add-to-cart

### 🛍️ Cart Flow

* Warehouse locked per cart
* Quantity-based cart management
* Ready for checkout integration

---

## 📊 Admin Dashboard (Analytics)

* Stock distribution charts
* Inventory health overview
* Warehouse-level metrics
* Responsive card-based charts using Chart.js

---

## 🔌 Backend Integration

The frontend communicates with backend microservices via REST APIs.

### Example Endpoints

```http
GET    /warehouses
POST   /warehouses
GET    /inventory/warehouse/{id}
POST   /inventory
PUT    /inventory/{inventoryId}
GET    /inventory/low-stock
POST   /orders
```

All base URLs are centralized in services.

---

## 🎯 Key Design Principles

* **Separation of concerns**
* **Service-driven API access**
* **Reusable components**
* **Modal-based UX (no route jumps)**
* **State-safe cart logic**
* **Scalable microservice-friendly design**

---

## 🧪 Development Setup

### Install dependencies

```bash
npm install
```

### Run the app

```bash
ng serve
```

### Access

```
http://localhost:4200
```

---

## 🛠️ Future Enhancements

* Role-based access (Admin / User)
* JWT authentication integration
* WebSocket stock updates
* Pagination & search
* Order history dashboard
* AI-powered demand prediction (Agent Server)

---

## 👨‍💻 Author

**Soham (Atomic Soham)**
Full-Stack | Distributed Systems | AI-Driven Systems
Built as part of the **Chubb Capstone Project**

