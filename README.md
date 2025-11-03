# BudgetGenie

**BudgetGenie** is an AI-powered platform that helps Kenyan university students discover meal options within their budget. It recommends multiple local meals like Chafua (Chapati & Beans), Githeri, and more, along with their prices, based on the user’s input budget.

Built with **React, Vite, Node.js, and Google Gemini AI**.

---

## Features

- Input your daily or weekly budget.
- Get multiple Kenyan student meal recommendations.
- Shows meal names, descriptions, and approximate prices.
- Lightweight and fast with modern UI.

---

## Tech Stack

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **AI Integration:** Google Gemini AI (or local fallback)
- **Database:** None (all computation-based)

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/montej-brian/BudgetGenie.git
cd BudgetGenie

2. **Backend setup**
cd backend
npm install

create .env
PORT=5000
GEMINI_API_KEY=your_valid_gemini_api_key_here

