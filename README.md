# 🚀 Order Management Platform

## 🔹 Overview
A full-stack web application designed to streamline **order processing, inventory management, and payments**. Built with **FastAPI (Python)** for the backend and **React.js + Redux** for the frontend, it supports **Mpesa payments** and is fully containerized with **Docker**.

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
- FastAPI (Python) | PostgreSQL | SQLAlchemy | Alembic | Docker | Mpesa API
### **Frontend:**
- React.js | Redux | Tailwind CSS | Vite

## 📂 Folder Structure
```
backend/
│── src/
│   ├── routers/         # API Routes
│   ├── models/          # Database Models
│   ├── services_layer/  # Business Logic
│   ├── payments/        # Mpesa Integration
│── .env                 # Configurations
│── Dockerfile           # Backend Containerization

frontend/
│── src/
│   ├── components/  # UI Components
│   ├── redux/       # State Management
│   ├── pages/       # App Views
│── vite.config.js   # Build Config
```

## 🔧 Installation & Setup
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
| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/products`                  | Get all products        |
| POST   | `/orders`                     | Create an order        |
| GET    | `/orders/{order_id}`         | Retrieve an order      |
| POST   | `/payments/initiate`         | Initiate Mpesa Payment |
| GET    | `/payments/status/{txn_id}` | Check Payment Status   |

## 🚀 Deployment
### **Backend**: AWS, DigitalOcean, Render (Gunicorn + NGINX)
### **Frontend**: Vercel, Netlify, Firebase Hosting
```sh
npm run build
```

## 🧪 Testing
### **Backend:**
```sh
pytest
```
### **Frontend:**
```sh
npm test
```

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit and push your changes.
4. Open a pull request.

## 📜 License
Licensed under the [MIT License](LICENSE).

## 📬 Contact
For inquiries, reach out to **Patricia Kamanthe** at **patriciamumbua97@gmail.com**.

