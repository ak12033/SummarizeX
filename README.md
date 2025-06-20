# 📚 SummarizeX — AI-Powered Knowledge Hub 🚀

**SummarizeX** is a secure, full-stack AI-powered platform where users can create, edit, and summarize articles using **Google Gemini 2.0 Flash**. It features JWT-based authentication, role-based access (admin/user), and a modern Vite + React frontend.

---

## 📌 Features

- 🔐 User registration & login with JWT  
- 👥 Role-based access (admin / user)  
- 📝 CRUD operations for articles  
- 🤖 AI-powered article summarization (Gemini 2.0 Flash)  
- ⚡ Clean, fast frontend built with Vite + React  
- 🎨 Role-aware UI controls  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express, MongoDB, JWT, Gemini 2.0 Flash  
- **Frontend:** Vite + React  
- **AI Integration:** @google/generative-ai SDK  

---

## 🌐 Live Server

👉 [Live Demo](https://summarize-x-iyrx.vercel.app/)

---

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository from GitHub:

2. **Set Environment Variables**: Navigate to the `frontend` and `backend` folders and add necessary environment variables. You may need to create a `.env` file and configure it with required variables:
   In the backend/.env file:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   SECRET_ADMIN_KEY=135724
   GEMINI_API_KEY=your_gemini_api_key
   LLM_PROVIDER=gemini
   ```

   In the frontend/.env file:

   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

3. **Install Dependencies**: Install dependencies in the `frontend` and `backend` folders using npm or yarn:

   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. **Start the Backend Server**: In the `backend` folder, start the development server using npm:

   ```
   npm run server
   ```

5. **Start the Frontend**: In the `frontend` folder, start the frontend application:

   ```
   npm run dev
   ```
