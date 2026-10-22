# 🧠 Brainrot Dictionary

**Decode the internet. Speak fluent brainrot. 💀**

🌐 **[Open the live website](https://biggybird.github.io/brainrot-dictionary/)** · ✨ **[Try Brainrot AI](https://biggybird.github.io/brainrot-dictionary/ai.html)** · 🧑‍💻 **[View the source code](https://github.com/biggybird/brainrot-dictionary)**

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
- **Brainrot AI chat** page scaffold with normal and Gen-Z-style response modes, powered by a server-side Gemini API endpoint when deployed on Vercel.

## 🛠️ Built With

- HTML
- CSS
- Vanilla JavaScript
- Browser LocalStorage and Web Share / Clipboard APIs where available

The dictionary and classic translator run locally. The separate Brainrot AI chat requires a Vercel backend and a Gemini API key; never place the key in public frontend code. Gemini free-tier availability and quotas depend on Google’s current terms.

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

## 🤖 Enable Brainrot AI on Vercel

1. Import this repository into your Vercel account and deploy it. The `api/chat.js` serverless function must be hosted on Vercel; GitHub Pages alone cannot run it.
2. In Vercel project **Settings → Environment Variables**, add `GEMINI_API_KEY` with your key from [Google AI Studio](https://aistudio.google.com/). Keep the key private and never commit it to GitHub.
3. Redeploy after adding the environment variable.
4. If Vercel gives the project a URL other than `https://brainrot-dictionary.vercel.app`, update `API_URL` at the top of `ai-chat.js` to that project URL, then commit the change.
5. The public GitHub Pages frontend calls the Vercel API endpoint. The AI chat will not work until the backend is deployed and configured.

The endpoint limits the conversation history and message length, but a public AI endpoint can still incur usage. Review Gemini quotas and consider adding stronger rate limiting before promoting it widely.

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
