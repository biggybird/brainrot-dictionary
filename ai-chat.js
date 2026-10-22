// Set this to the deployed Vercel URL if your project uses a different domain.
const API_URL = "https://biggybird-brainrot-dictionary.vercel.app/api/chat";
const $ = (selector) => document.querySelector(selector);
const form = $("#chatForm");
const input = $("#promptInput");
const messagesEl = $("#messages");
const sendBtn = $("#sendBtn");
const statusEl = $("#status");
const modeEl = $("#mode");
let history = [];
let busy = false;

function addMessage(role, content, extraClass = "") {
  $("#welcome")?.remove();
  const node = document.createElement("div");
  node.className = "message " + role + (extraClass ? " " + extraClass : "");
  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = role === "user" ? "You" : role === "error" ? "Brainrot AI" : "Brainrot AI";
  const text = document.createElement("div");
  text.textContent = content;
  node.append(label, text);
  messagesEl.appendChild(node);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return node;
}

async function sendMessage(text) {
  const message = text.trim();
  if (!message || busy) return;
  history.push({ role: "user", content: message });
  addMessage("user", message);
  input.value = "";
  input.style.height = "auto";
  busy = true;
  sendBtn.disabled = true;
  sendBtn.classList.add("loading");
  sendBtn.textContent = "Thinking…";
  statusEl.textContent = "Gemini is thinking…";
  const pending = document.createElement("div");
  pending.className = "message assistant typing";
  pending.textContent = "Cooking up an answer…";
  messagesEl.appendChild(pending);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-12), mode: modeEl.checked ? "brainrot" : "normal" })
    });
    const data = await response.json().catch(() => ({}));
    pending.remove();
    if (!response.ok) throw new Error(data.error || "Request failed. Please try again.");
    const answer = String(data.answer || "").trim();
    if (!answer) throw new Error("Gemini returned an empty answer.");
    history.push({ role: "assistant", content: answer });
    history = history.slice(-12);
    addMessage("assistant", answer);
    statusEl.textContent = "Answered by Gemini. Check important facts.";
  } catch (error) {
    pending.remove();
    addMessage("error", error.message || "Could not connect. Please try again.", "error");
    statusEl.textContent = "Couldn't get an answer.";
  } finally {
    busy = false;
    sendBtn.disabled = false;
    sendBtn.classList.remove("loading");
    sendBtn.textContent = "Send ↑";
    input.focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 160) + "px";
});
document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.prompt;
    sendMessage(input.value);
  });
});
$("#clearChat").addEventListener("click", () => {
  if (busy) return;
  history = [];
  messagesEl.innerHTML = "";
  const welcome = document.createElement("div");
  welcome.className = "welcome";
  welcome.id = "welcome";
  welcome.innerHTML = '<div class="welcome-icon">✦</div><h2>Fresh chat. Fresh neurons.</h2><p>Ask a new question whenever you are ready.</p>';
  messagesEl.appendChild(welcome);
  statusEl.textContent = "New conversation started.";
  input.focus();
});
const themeBtn = $("#themeBtn");
const root = document.documentElement;
const savedTheme = localStorage.getItem("br_theme");
if (savedTheme === "light") root.dataset.theme = "light";
themeBtn.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙";
themeBtn.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("br_theme", root.dataset.theme);
  themeBtn.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙";
});
