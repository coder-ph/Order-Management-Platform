# 🚀 Order Management Platform

## 🔹 Overview

A full-stack web application designed to streamline **order processing, inventory management, and payments**. Built with **Flask + FastAPI (Python)** for the backend and **React.js + Redux** for the frontend, it supports **Mpesa payments** and is fully containerized with **Docker**.

## ✨ Features

✅ **User Authentication & Authorization**  
✅ **Order & Inventory Management**  
✅ **Store & Client Management**  
✅ **Role-Based Access Control (RBAC)**  
✅ **Mpesa Payment Integration**  
✅ **Error Handling & Logging**  
✅ **Database Migrations & Seeding**  
✅ **Docker Support for Easy Deployment**

## 🛠 Tech Stack

### **Backend:**
- Flask + FastAPI (Python) | PostgreSQL | SQLAlchemy | Alembic | Docker | Mpesa API

### **Frontend:**
- React.js | Redux | Tailwind CSS | Vite

## 💂️ Folder Structure

### **Backend**

```
backend/
│── migrations/           # Database migrations
│   ├── versions/        
│   ├── alembic.ini
│   ├── env.py
│   ├── README
│   ├── script.py.mako
│
│── models/              # Database models
│   ├── location_model.py
│   ├── log.py
│   ├── model_enums.py
│   ├── orders_model.py
│   ├── product_model.py
│   ├── store_model.py
│   ├── users_model.py
│
│── src/
│   ├── config/          # Application configurations
│   ├── error/           # Error handlers
│   ├── handlers/        # Request handlers
│   ├── routers/         # API routes
│   ├── seeding/         # Database seeding scripts
│   ├── services_layer/  # Business logic
│   ├── startup/         # Startup configurations
│
│── .env                 # Configurations
│── acl.json             # Access control configurations
│── docker-compose.yml   # Docker setup
│── Dockerfile           # Backend containerization
│── fly.toml             # Deployment configuration
│── index.py             # Entry point for backend
│── Pipfile              # Dependencies
│── Pipfile.lock         # Dependency lockfile
│── README.md            # Documentation
```

### **Frontend**

```
client/
├── docs/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── Bff/
│   ├── Components/
│   ├── Context/
│   ├── data/
│   ├── Hooks/
│   ├── Pages/
│   ├── Redux/
│   ├── scenes/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── index.jsx
│   ├── main.jsx
│   ├── theme.js
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── Pipfile
├── Pipfile.lock
├── README.md
├── vite.config.js
```

## 🛠 Installation & Setup

### **Backend**
```sh
git clone https://github.com/your-repo/order-management-platform.git
cd order-management-platform
pipenv install
alembic upgrade head
uvicorn src.startup.index:app --reload
```

### **Frontend**
```sh
cd client
npm install
npm run dev
```

### **Docker Setup**
```sh
docker-compose up --build
```

## 🔗 API Endpoints

| Method | Endpoint                                     | Description                    |
|--------|----------------------------------------------|--------------------------------|
| **Users** | | |
| GET    | `api/v1/users/all`                          | Get all users                  |
| POST   | `api/v1/users`                              | Create a user                  |
| PUT    | `api/v1/users/update-password`             | Update password                |
| PUT    | `api/v1/users/reset-password`              | Reset password                 |
| GET    | `api/v1/users/otp?key=`                    | Request OTP                    |
| GET    | `api/v1/users/otp/verify?key=`             | Verify OTP                      |
| GET    | `api/v1/users?email=`                      | Sign in                         |
| **Orders** | | |
| GET    | `api/v1/orders`                            | Get all orders                 |
| GET    | `api/v1/orders/invoices`                   | Get all invoices               |
| POST   | `api/v1/orders/checkout`                   | Checkout order                 |
| POST   | `api/v1/orders`                            | Create an order                |
| GET    | `api/v1/orders/my-orders`                  | Get all my orders              |
| GET    | `api/v1/orders/my-store`                   | Get orders by store            |
| **Products** | | |
| POST   | `api/v1/products/categories`               | Create a product category      |
| POST   | `api/v1/products`                          | Create a product               |
| PUT    | `api/v1/products/{productId}`              | Update a product               |
| DELETE | `api/v1/products/{productId}`              | Delete a product               |
| GET    | `api/v1/products/categories`               | Fetch product categories       |
| GET    | `api/v1/products`                          | Fetch products                 |
| **Store** | | |
| POST   | `api/v1/store`                             | Create a store                 |
| GET    | `api/v1/store/seed`                        | Fetch store seed data          |
| PUT    | `api/v1/store/status`                      | Change store status            |
| GET    | `api/v1/store`                             | Get all stores                 |

## 🚀 Deployment

### **Backend**: Render (Gunicorn + NGINX)
### **Frontend**: Vercel
```sh
npm run build
```

## 🤍 Contributing

1. Fork the repository.
2. Create a new branch (feature-branch).
3. Commit and push your changes.
4. Open a pull request.

## 🐝 License

Licensed under the [MIT License](LICENSE).

## 💌 Contact

For inquiries, reach out to:
- **Debrah Navajjah Muinde** - [debbynav645@gmail.com](mailto:debbynav645@gmail.com)
- **Ken Maina** - [mainakenken188@gmail.com](mailto:mainakenken188@gmail.com)
- **Christopher Karanja Ng'ang'a** - [karanjamikey@gmail.com](mailto:karanjamikey@gmail.com)
- **Patricia Kamanthe** - [patriciamumbua97@gmail.com](mailto:patriciamumbua97@gmail.com)
- **Phelix Odhiambo** - [phelixmbani@gmail.com](mailto:phelixmbani@gmail.com)
- **MCdonald Omondi** - [m.o.shellton@gmail.com](mailto:m.o.shellton@gmail.com)

