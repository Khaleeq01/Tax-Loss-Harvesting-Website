# 🧾 Tax Loss Harvesting Dashboard

A responsive React-based dashboard that helps users analyze their crypto holdings and simulate **tax-loss harvesting** to optimize capital gains.

---

## 🚀 Live Demo

🔗 https://tax-loss-harvesting-website.vercel.app/

## ✨ Features

* 📊 View all crypto holdings in a clean table
* 📉 Calculate **Pre vs After Tax Harvesting**
* 💰 Display **realized capital gains & savings**
* ✅ Select assets to simulate harvesting
* 🔄 Sort Short-Term Gains (Ascending/Descending)
* 👁 Tooltip for price details
* 📱 Fully responsive (Table → Card layout on mobile)
* 📦 Clean component-based architecture
* ⚡ Loading & Error handling

---

## 🧠 State Management

State is managed using a **custom React hook (`useTaxHarvesting`)**, which:

* Handles API data fetching
* Stores UI state (selected assets)
* Computes derived values using `useMemo`:

  * After Harvesting Gains
  * Tax Savings

> Context API was intentionally avoided to prevent over-engineering since the state is scoped to a single page.

---

## 🗂️ Folder Structure

```
src/
│── api/                # Mock API data
│── components/         # Reusable UI components
│── hooks/              # Custom hooks (state logic)
│── types/              # TypeScript types
│── utils/              # Calculation logic
│── App.tsx             # Main layout
│── main.tsx            # Entry point
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Khaleeq01/Tax-Loss-Harvesting-Website.git
cd Tax-Loss-Harvesting-Website
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the app

```bash
npm run dev
```

App will run on:
👉 http://localhost:5173

---

## 🧪 Assumptions

* API responses are mocked using local JSON files
* Tax-loss harvesting rules are simplified for demonstration
* Only **realized gains/losses** are considered
* No authentication or user accounts included
* Prices are static (no real-time updates)

---

## 🛠 Tech Stack

* ⚛️ React + TypeScript
* 🎨 Tailwind CSS
* ⚡ Vite
* 📊 Custom Hooks for state management

---

## 📌 Future Improvements

* Integrate real APIs (Coingecko)
* Add authentication
* Persist user selections
* Add charts & analytics
* Improve accessibility

---

## 🙌 Acknowledgements

* Inspired by real-world tax harvesting tools
* Icons & UI inspired by modern fintech dashboards

---

## 📬 Contact

If you have any questions or feedback, feel free to reach out!

---

⭐ If you like this project, consider giving it a star!
