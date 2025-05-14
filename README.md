# MacroAI

A forward-thinking full-stack web application that leverages AI to help users plan meals based on macronutrient targets and ingredients. MacroAI consists of two parts:

* **Backend**: Node.js + Express API for ingredient management and recipe generation.
* **Frontend**: React application for user interaction and display.

## 📁 Repository Structure

```
MacroAI/
├── backend/         # Node.js API source code
├── frontend/        # React app source code
├── .gitignore
├── package.json     # Root defines backend scripts & dependencies
└── README.md        # This file
```

## 🚀 Features

* **Macro Tracking**: Specify your daily carbohydrate, protein, and fat targets.
* **Ingredient Management**: Add, update, and remove ingredients via API.
* **Recipe Suggestions**: (Coming soon) Generate custom recipes using a Hugging Face model.

## 🔧 Prerequisites

* **Node.js** v14 or higher
* **npm** v6 or higher (or **yarn**)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/auyjos/MacroAI.git
   cd MacroAI
   ```
2. **Install backend dependencies**

   ```bash
   npm install
   ```
3. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   cd ..
   ```

## ⚙️ Configuration

1. Rename `.env.example` (in the root) to `.env`.
2. Add the following variables:

   ```dotenv
   HF_API_TOKEN=<your_huggingface_token>
   PORT=5000              # Backend API port
   NODE_ENV=development
   ```
3. (Optional) In `frontend/.env`, you can set:

   ```dotenv
   REACT_APP_API_URL=http://localhost:5000
   ```

## 🚴‍♀️ Running the App

Open two terminals:

* **Backend**

  ```bash
  # From project root
  npm run dev       # Starts Express API with nodemon
  ```

* **Frontend**

  ```bash
  cd frontend
  npm start         # Starts React development server
  ```

Visit your browser at `http://localhost:3000` to view the app.

## 🔭 Future Development

* **Recipe Generation**: Send user-provided ingredients to a Hugging Face model and display AI-generated recipes.
* **User Authentication & Profiles**: Allow users to save preferences and meal history.
* **Export & Sharing**: Generate PDF/CSV exports of meal plans and share with friends.
* **Mobile-Friendly UI**: Responsive design for on-the-go meal planning.

## 🤝 Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add [feature]"`.
4. Push branch: `git push origin feature/YourFeature`.
5. Open a Pull Request and describe your changes.

Please keep commits atomic and add tests when applicable.

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

*Built with ❤️ by Jose Andres Auyon Cobar*
