Order Management Platform
Overview
The Order Management Platform is a full-stack web application designed to streamline order processing, inventory management, and store operations. The platform consists of a backend built with Python and FastAPI and a frontend developed using React.js with state management using Redux.
Features
•	User authentication and authorization
•	Order tracking and management
•	Product catalog with categories and inventory management
•	Store and client management
•	Role-based access control (RBAC)
•	Error handling and logging
•	Database migrations and seed data
•	Docker support for deployment
Tech Stack
Backend:
•	Python (FastAPI for API development)
•	SQLAlchemy (ORM for database interactions)
•	Alembic (Database migrations)
•	Docker (Containerization)
•	PostgreSQL (Relational Database)
•	Pipenv (Dependency Management)
Frontend:
•	React.js (Component-based UI development)
•	Redux (State management)
•	Vite (Build tool for fast development)
•	CSS & Tailwind (Styling and responsive design)
Folder Structure
Backend (Back End)
•	models/ - Database models (Users, Orders, Products, Stores, Clients, etc.)
•	migrations/ - Database migration scripts (Alembic)
•	src/ 
o	config/ - Application configuration settings
o	handlers/ - Exception handling and error responses
o	routers/ - API routes
o	seeding/ - Database seeding scripts
o	services_layer/ - Business logic and service handlers
o	startup/ - App initialization files
•	.env - Environment variables configuration
•	Dockerfile - Docker build file for containerization
•	docker-compose.yml - Configuration for running services with Docker Compose
Frontend (Front End)
•	client/ 
o	src/ 
	Components/ - Reusable UI components
	Pages/ - Application views
	Redux/ - State management setup
	Hooks/ - Custom hooks for API interactions
	Context/ - Context API-based state management
o	public/ - Static assets
o	vite.config.js - Build configuration
o	.eslint.config.js - Linting setup
Installation & Setup
Backend Setup
1.	Clone the repository: 
2.	git clone https://github.com/your-repo/order-management-platform.git
3.	cd order-management-platform
4.	Set up a virtual environment and install dependencies: 
5.	pipenv install
6.	Create a .env file and configure database credentials.
7.	Apply database migrations: 
8.	alembic upgrade head
9.	Run the FastAPI server: 
10.	uvicorn src.startup.index:app --reload
Frontend Setup
1.	Navigate to the client/ directory: 
2.	cd client
3.	Install dependencies: 
4.	npm install
5.	Start the frontend application: 
6.	npm run dev
Running with Docker
1.	Ensure Docker is installed.
2.	Build and start the services: 
3.	docker-compose up --build
API Endpoints
Method	Endpoint	Description
GET	/products	Get all products
POST	/orders	Create an order
GET	/orders/{order_id}	Retrieve an order
PUT	/orders/{order_id}	Update an order
DELETE	/orders/{order_id}	Delete an order
Contribution


- Deoloyed link-  `order-management-platform-g4-git-main-coder-phs-projects.vercel.app`