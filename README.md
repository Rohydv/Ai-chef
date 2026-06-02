# 🍳 NutriChef AI

A cooking and nutrition assistant web application that helps users manage their fridge inventory, discover recipes from available ingredients, and check missing ingredients for any dish.

## Features

- **Fridge Inventory Management** — Add, view, and delete ingredients in your virtual fridge
- **Recipe Generator** — Get recipe suggestions matched against your current ingredients
- **Missing Ingredient Checker** — See exactly what you have and what you're missing for any recipe
- **15 Pre-loaded Recipes** — Includes nutrition info (calories, protein, carbs, fat), cooking time, difficulty, and step-by-step instructions

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Backend  | Python Flask, Flask-SQLAlchemy, SQLite |
| Frontend | React, TypeScript, Vite, Tailwind CSS v4 |

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+

### 1. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python run.py
```

The backend will start on **http://localhost:5000**. The database and 15 mock recipes are created automatically on first run.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:5173**.

### 3. Open the App

Visit [http://localhost:5173](http://localhost:5173) in your browser. No login required — the app runs in Guest Mode.

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── __init__.py        # Flask app factory
│   │   ├── config.py          # App configuration
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── seed.py            # 15 mock recipes seeder
│   │   └── routes/
│   │       ├── auth.py        # Auth endpoints (optional)
│   │       ├── inventory.py   # Fridge CRUD endpoints
│   │       └── recipes.py     # Recipe matching engine
│   ├── requirements.txt
│   └── run.py                 # Entry point
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── components/        # Reusable UI components
    │   ├── context/           # React contexts
    │   ├── pages/             # Dashboard, Inventory, RecipeGenerator
    │   ├── services/          # API client
    │   └── types.ts           # TypeScript interfaces
    ├── package.json
    └── vite.config.ts
```

## License

MIT
