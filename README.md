# 📝 Kanban Task Manager

A full-stack **Kanban Board** application built with **React, TailwindCSS, @hello-pangea/dnd** for drag-and-drop, and **Node.js + Express + MongoDB** for the backend.
Easily create, update, and organize tasks with a responsive UI and modal-based task creation.

---

## ✨ Features

* 📌 Create, update, and delete tasks
* 🎨 Choose custom colors for tasks
* 📂 Organize tasks by status: `To Do`, `Backlog`, `In Progress`, `Completed`
* 📦 Drag & drop tasks between columns (`@hello-pangea/dnd`)
* 📱 Responsive design for desktop & mobile
* 🔒 Secure API with `.env` support

---

## 🛠️ Tech Stack

**Frontend**

* React + Vite
* TailwindCSS
* @hello-pangea/dnd (drag & drop)
* Axios
* React Hot Toast

**Backend**

* Node.js + Express
* MongoDB (Mongoose)
* dotenv
* CORS

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/kanban-task-manager.git
cd kanban-task-manager
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

## 📂 Folder Structure

```
├── README.md
├── client
│   ├── .env
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── Kanban.jsx
│   │   │   └── Loading.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── models
│   │       └── TaskModel.jsx
│   └── vite.config.js
└── server
    ├── .gitignore
    ├── controller
    │   └── taskController.js
    ├── database
    │   └── connectDB.js
    ├── models
    │   └── taskSchema.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   └── taskRoutes.js
    └── server.js
```

---

## 🖼️ Screenshots

### Kanban Board
<img width="1920" height="1029" alt="Screenshot (167)" src="https://github.com/user-attachments/assets/08de1f84-5206-4e26-84ad-989b5afe0ad9" />

### Create Task Modal
<img width="1920" height="1029" alt="Screenshot (168)" src="https://github.com/user-attachments/assets/6b5781e6-9c80-479a-a217-e891066b42a4" />

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to suggest features or report bugs, open an issue.

---

## 📜 License

This project is licensed under the **MIT License**.
