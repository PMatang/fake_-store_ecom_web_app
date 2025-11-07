# fake_-store_ecom_web_app

An elegant full-stack **MERN e-commerce demo application** featuring a smooth UI, live product sync, cart management, and checkout modal.  
This project demonstrates a modern full-stack architecture with React, Node.js, Express, and MongoDB.

---

## 🚀 Features

- 🌐 **Full-Stack MERN Setup**
  - React.js frontend + Node.js / Express backend
  - MongoDB for persistent data storage

- 🧩 **Product Management**
  - Products are fetched from the [Fake Store API](https://fakestoreapi.com/)
  - Synced and stored into MongoDB on startup

- 🛒 **Cart & Checkout System**
  - Add / remove products dynamically
  - Real-time total calculation (rounded & formatted)
  - Elegant checkout form with receipt modal

- 💅 **Beautiful UI/UX**
  - Responsive and animated **light-themed** design
  - Gradient backgrounds, smooth hover effects, and modern shadows

- 💾 **Backend API**
  - `/api/products` → Fetch available products  
  - `/api/cart` → Retrieve cart items  
  - `/api/cart/add` → Add product to cart  
  - `/api/cart/remove/:id` → Remove product from cart  
  - `/api/order` → Place an order and return receipt  

---

## 🧱 Tech Stack

**Frontend:**
- React.js (Vite / Create React App)
- Axios
- Modern CSS with gradients, animations, and responsive layout

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose ORM
- dotenv for environment configuration

**Database:**
- MongoDB Atlas / Local MongoDB instance

---

## ⚙️ Setup & Installation

###Clone the repository

git clone https://github.com/yourusername/mock-cart.git
cd mock-cart

###Install dependencies
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install

###Environment variables
Create a .env file inside /backend and add:

MONGO_URI=mongodb+srv://your-connection-string
PORT=5000

###Run the development servers
# backend
cd backend
npm start

# frontend (in a new terminal)
cd frontend
npm run dev



Frontend — http://localhost:5173
Backend API — http://localhost:5000

| Endpoint             | Method | Description                 |
| -------------------- | ------ | --------------------------- |
| /api/products        | GET    | Get all products            |
| /api/cart            | GET    | Retrieve cart items         |
| /api/cart/add        | POST   | Add product to cart         |
| /api/cart/remove/:id | DELETE | Remove product from cart    |
| /api/order           | POST   | Place order and get receipt |


Project Description

Vibe Commerce — Mock Cart is a modern full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It showcases a complete shopping experience — from viewing products to adding them to a cart and completing a mock checkout. The application fetches product data from the Fake Store API, stores it in MongoDB, and provides RESTful endpoints for managing products and cart operations.

The frontend, designed with a clean, elegant, and responsive light theme, allows users to browse items in a grid view, add or remove products from the cart, view totals in real time, and simulate a checkout with name and email inputs. Once an order is placed, the system generates a mock receipt showing the order ID, timestamp, product list, and total cost.

This project demonstrates strong integration between frontend and backend systems, focusing on modular architecture, smooth UI/UX, and dynamic state management. It also highlights best practices in API design, data handling, and currency formatting. Vibe Commerce serves as a perfect demonstration of full-stack development skills, showcasing both technical depth and attention to user experience.
