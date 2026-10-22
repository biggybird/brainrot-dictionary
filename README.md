# 🧠 Brainrot Dictionary

**Decode the internet. Speak fluent brainrot. 💀**

🌐 **[Open the live website](https://biggybird.github.io/brainrot-dictionary/)**

✨ **[Try Brainrot AI](https://biggybird-brainrot-dictionary.vercel.app/ai.html)**

🚀 **[Open the Vercel deployment](https://biggybird-brainrot-dictionary.vercel.app/)**

🧑‍💻 **[View the source code](https://github.com/biggybird/brainrot-dictionary)**

Brainrot Dictionary is a playful, mobile-friendly web app for exploring Gen-Z slang, gaming terms, TikTok vocabulary, memes, and internet shorthand. Search for a word, learn what it means, see it used in a sentence, and test your knowledge with a brainrot quiz.

## ✨ Features

- **Searchable dictionary** with definitions, example sentences, categories, and popularity ratings.
- **Category filters** for Gen-Z, Gaming, TikTok, Memes, and Internet Slang.
- **Word of the Day** with a word that stays consistent throughout the day on the same local date.
- **Random Word** button for discovering new slang.
- **Brainrot Translator** that transforms ordinary text using a local phrase-and-word replacement engine.
- **Brainrot Quiz** with 10 randomized questions, score tracking, and a saved best score.
- **Saved words** stored in your browser using LocalStorage.
- **Copy and share** word definitions and quiz results where supported by the browser.
- **Dark and light themes** with the selected theme saved on your device.
- **Responsive interface**, keyboard search shortcut, reduced-motion support, and accessible labels.
- **Brainrot AI chat** with normal and Gen-Z-style response modes, powered by Google Gemini through a server-side Vercel API. Anyone can try the public live chat without adding their own API key.

## 🛠️ Built With

- HTML
- CSS
- Vanilla JavaScript
- Browser LocalStorage and Web Share / Clipboard APIs where available

The dictionary and classic translator run locally. The live Brainrot AI site is hosted on Vercel and uses a Gemini API key stored securely as a server-side environment variable. Visitors do **not** need to supply their own key or sign in to try the public chat. Gemini availability and quotas depend on Google’s current terms, and the public endpoint may be subject to usage limits.

## 🚀 Run Locally

1. Download or clone this repository.
2. Keep `index.html`, `style.css`, and `script.js` in the same folder.
3. Open `index.html` in a modern browser.

For the best compatibility with browser features such as sharing and clipboard access, run it through a local development server or host it on a static site.

## 📁 Project Structure

```text
brainrot-dictionary/
├── index.html   # App structure and accessible page sections
├── style.css    # Responsive layout, themes, cards, and animations
├── script.js    # Dictionary data and app interactions
├── ai.html      # Gemini-powered chat interface
├── ai-chat.js   # Chat frontend
├── ai-chat.css  # Chat styles
├── api/chat.js  # Server-side Gemini API endpoint for Vercel
├── vercel.json  # Vercel function configuration
├── package.json # Minimal project metadata
├── README.md    # Project documentation
└── LICENSE      # MIT License
```

## 🤖 Try Brainrot AI

**Anyone can use the deployed AI chat:**

- **[Open Brainrot AI](https://biggybird-brainrot-dictionary.vercel.app/ai.html)**
- No account or personal Gemini API key is required to use the public chat.
- Ask questions about programming, learning, writing, ideas, and everyday topics.
- Toggle **Brainrot mode** for playful Gen-Z slang, or leave it off for straightforward answers.

### Deploy your own copy

If you fork this project and want to host your own AI backend:

1. Import your fork into [Vercel](https://vercel.com/new). The `api/chat.js` serverless function needs a server-side host; GitHub Pages alone cannot run it.
2. In Vercel, open **Project Settings → Environment Variables** and add `GEMINI_API_KEY` using a key from [Google AI Studio](https://aistudio.google.com/apikey).
3. Keep the key private. Never put it in frontend JavaScript or commit it to GitHub.
4. Redeploy after adding the environment variable.
5. Set the `API_URL` at the top of `ai-chat.js` to your own deployed API endpoint, ending in `/api/chat`, and publish the frontend.

The public chat uses the project owner's configured Gemini API quota. Availability and quotas can change, and public usage may be limited to protect the service.
## 💾 Privacy

Favorites, theme preferences, and the best quiz score are stored in your browser's LocalStorage. The app does not need an account or send these preferences to a server.

## 🧪 Current Scope

This is a front-end project. The translator uses predefined local rules, the dictionary is bundled with the app, and favorites are saved only in the current browser/device. There is no cloud sync or community-submission backend yet.

## 🤝 Contributing

Suggestions, corrections, and improvements are welcome. If you spot a slang definition that needs context or updating, open an issue or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Made for the chronically online. Please remember to touch grass occasionally. 🌱
