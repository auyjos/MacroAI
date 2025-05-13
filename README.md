# MacroAI

A forward-thinking web application that leverages AI to help users plan meals based on macronutrient targets and ingredients. MacroAI streamlines recipe generation by integrating with machine learning models and provides a foundation for future extensions.

## 🚀 Features

* **Macro Tracking**: Specify your daily carbohydrate, protein, and fat targets.
* **Ingredient Management**: Add and manage your own ingredients.
* **Recipe Suggestions**: (Coming soon) Generate custom recipes using a Hugging Face model.

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/auyjos/MacroAI.git
   cd MacroAI
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

## ⚙️ Configuration

1. Rename `.env.example` to `.env`.
2. Fill in your environment variables:

   ```dotenv
   HF_API_TOKEN=<your_huggingface_token>
   PORT=5000
   NODE_ENV=development
   ```

## 🚴‍♀️ Usage

* **Start the server**

  ```bash
  npm start
  # or, if you have nodemon installed:
  npm run dev
  ```
* The backend will listen on the port configured in your `.env` (default `5000`).
* Navigate to `http://localhost:5000` in your browser or use an HTTP client.

## 🔭 Future Development

* **Recipe Generation**: Send user-provided ingredients to a Hugging Face model and display AI-generated recipes.
* **User Profiles & Authentication**: Allow users to save preferences and meal history.
* **Export & Sharing**: Generate PDF/CSV exports of meal plans and share with friends.
* **Mobile-Friendly UI**: Responsive design for on-the-go meal planning.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request describing your changes.

Please keep commits atomic and add tests where applicable.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ by Jose Andres Auyon Cobar*
