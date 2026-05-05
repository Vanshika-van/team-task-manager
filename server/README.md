# 🚀 Team Task Manager

A full-stack project and task management application built with React, Node.js, and PostgreSQL.

## 🌐 Live Demo
- **Frontend:** https://determined-motivation-production-a32e.up.railway.app
- **Backend:** https://sincere-solace-production.up.railway.app

## ✨ Features
- 🔐 User Authentication (Signup/Login with JWT)
- 📁 Create, View, and Delete Projects
- ✅ Create, Update, and Delete Tasks
- 📊 Kanban Board (TODO, IN PROGRESS, DONE)
- 📈 Dashboard with task statistics
- 🌙 Beautiful Dark Green UI

## 🛠 Tech Stack
### Frontend
- React.js
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- Prisma ORM (v7)
- PostgreSQL
- JWT Authentication
- bcryptjs

### Deployment
- Frontend → Railway
- Backend → Railway
- Database → Railway PostgreSQL

## 🚀 Setup Instructions

### Prerequisites
- Node.js v20+
- PostgreSQL database

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Add your DATABASE_URL and JWT_SECRET to .env
npx prisma migrate dev --name init
npx prisma generate
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 📁 Folder Structure
team-task-manager/
├── client/          # React frontend
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── server/          # Express backend
├── src/
│   ├── routes/
│   ├── middleware/
│   ├── prisma.js
│   └── index.js
├── prisma/
│   └── schema.prisma
└── package.json
## 🔑 Environment Variables
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
```

## 👩‍💻 Author
Vanshika