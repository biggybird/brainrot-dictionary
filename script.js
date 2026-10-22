/* =========================================================
   BRAINROT DICTIONARY — script.js
   1. Data   2. Helpers   3. Dictionary   4. Spotlight
   5. Favorites & card actions   6. Translator   7. Quiz
   8. Navigation, theme & startup
   ========================================================= */

/* ================= 1. DATA ================= */
// Category codes → display names
const CATS = { g: "Gen-Z", v: "Gaming", t: "TikTok", m: "Memes", i: "Internet Slang" };

// Each entry: [word, category, popularity 1–5, definition, example]
const RAW = [
  // ---- Gen-Z ----
  ["rizz","g",5,"Charm or flirting skill; the ability to attract someone.","He walked up with zero fear and max rizz."],
  ["no cap","g",5,"No lie; I'm being honest.","That concert was the best night ever, no cap."],
  ["cap","g",5,"A lie or an exaggeration.","You beat the whole game in an hour? That's cap."],
  ["bet","g",4,"Okay, deal, or sounds good.","Meet at six? Bet."],
  ["slay","g",5,"To do something exceptionally well.","She slayed that presentation."],
  ["bussin","g",4,"Extremely good, usually about food.","This ramen is bussin."],
  ["mid","g",5,"Mediocre; nothing special.","The movie was mid, honestly."],
  ["drip","g",4,"Stylish clothes or an impressive overall look.","Look at his drip in those new sneakers."],
  ["delulu","g",4,"Short for delusional; playfully hopeful about unlikely things.","I'm delulu, but I think she'll text back."],
  ["ick","g",4,"A sudden turn-off about someone you were interested in.","He chewed with his mouth open and I got the ick."],
  ["situationship","g",4,"A romantic relationship with no clear label or commitment.","We're not dating, it's a situationship."],
  ["simp","g",4,"Someone who does too much for a crush, hoping for affection.","He bought her lunch every day. Total simp."],
  ["salty","g",3,"Bitter or annoyed, often after losing.","He's salty because he lost the bet."],
  ["lowkey","g",4,"Somewhat or secretly; not openly.","I lowkey love this song."],
  ["highkey","g",3,"Openly or very much.","I highkey need a nap."],
  ["ghosting","g",4,"Suddenly cutting off contact without explanation.","She got ghosted after the second date."],
  ["glow-up","g",4,"A major improvement in looks or confidence.","Her glow-up over the summer was unreal."],
  ["main character energy","g",4,"Acting confident, like the protagonist of your own story.","Walking in with headphones on? Main character energy."],
  ["understood the assignment","g",4,"Did something exactly right, with style.","The costume? She understood the assignment."],
  ["era","g",4,"A phase of life defined by a mood or focus.","I'm in my healing era."],
  ["it's giving","g",4,"Used to say something gives off a certain vibe.","That outfit? It's giving old money."],
  ["periodt","g",3,"An emphatic 'period': end of discussion.","Pizza is the best food, periodt."],
  ["yeet","g",3,"To throw something forcefully; also an excited exclamation.","I yeeted my homework into the bin."],
  ["rent free","g",4,"Stuck in your mind constantly.","That song lives in my head rent free."],
  ["touch grass","g",4,"A nudge to go outside because you're too online.","You've argued online for six hours. Touch grass."],
  ["fire","g",3,"Really good or impressive.","Your new playlist is fire."],
  ["stan","g",4,"To be a devoted, enthusiastic fan.","I stan this band forever."],
  ["flex","g",3,"To show off.","He flexed his new watch."],
  ["tea","g",3,"Gossip or juicy news.","Spill the tea."],
  ["shook","g",3,"Shocked or emotionally rattled.","I'm shook. That ending was wild."],
  ["glazing","g",4,"Praising someone excessively.","Stop glazing him, it was an okay game."],
  ["aura","g",4,"Your vibe or charisma, jokingly counted in points.","He tripped but recovered smoothly. Plus 100 aura."],
  ["goat","g",4,"Greatest of all time.","Messi is the GOAT."],
  ["ngl","g",4,"Not gonna lie.","Ngl, that was impressive."],
  ["fr","g",5,"For real.","That test was hard, fr."],
  ["W","g",5,"A win.","You got the job? Huge W."],
  ["L","g",5,"A loss or failure.","Forgot my ticket. Major L."],
  ["pookie","g",3,"A term of endearment for someone close to you.","Hey pookie, how was your day?"],
  ["demure","g",3,"Modest and mindful; went viral in a 2024 TikTok trend.","Arrived on time, very demure, very mindful."],
  ["brat","g",3,"A confident, messy, carefree attitude, popularized by Charli XCX's 2024 album.","It's a brat summer."],
  // ---- Gaming ----
  ["GG","v",5,"Good game; said after a match, win or lose.","GG, that was close."],
  ["noob","v",4,"A beginner, sometimes used as an insult.","Don't be mean, he's just a noob."],
  ["sweaty","v",4,"Playing with try-hard intensity, even in a casual match.","This lobby is so sweaty tonight."],
  ["camping","v",3,"Staying in one hiding spot to ambush opponents.","He kept camping the spawn point."],
  ["smurf","v",3,"An experienced player on a new account, facing weaker opponents.","That's a smurf. Nobody is that good at level 3."],
  ["nerf","v",4,"To weaken a character or item in a game update.","They nerfed my favorite weapon."],
  ["buff","v",3,"To strengthen a character or item in a game update.","The patch buffed healers."],
  ["lag","v",4,"A delay between your input and the screen, from a slow connection.","I lost because of lag."],
  ["OP","v",4,"Overpowered; too strong to be fair. (On forums it can also mean original poster.)","That sniper rifle is OP."],
  ["NPC","v",5,"A non-player character in a game; online, someone acting scripted.","He repeats the same joke every day, like an NPC."],
  ["AFK","v",3,"Away from keyboard.","Brb, going AFK for five minutes."],
  ["clutch","v",4,"Winning a tense moment against the odds.","She won the round 1v4. Clutch."],
  ["tilt","v",3,"A frustrated state where mistakes snowball.","After the third loss I was fully tilted."],
  ["grinding","v",3,"Repeating tasks to level up or earn rewards.","I'm grinding for the rare armor."],
  ["meta","v",3,"The most effective strategies at the moment.","Stealth is the meta this season."],
  ["carry","v",4,"To lead your team to victory through strong play.","Our support carried us."],
  ["skill issue","v",5,"A mocking line: you failed from lack of skill, not bad luck.","You fell off the map? Skill issue."],
  ["RNG","v",3,"Random number generator; luck in a game.","Bad RNG ruined my run."],
  ["cracked","v",4,"Extremely skilled at a game.","That kid is cracked at aiming."],
  ["sus","v",5,"Suspicious; popularized by the game Among Us.","Why were you near the vent? Kinda sus."],  // ---- TikTok ----
  ["FYP","t",5,"For You Page: TikTok's personalized video feed.","That video blew up after it hit the FYP."],
  ["POV","t",4,"Point of view; videos framed as if you're in the scene.","POV: you forgot the group project is due today."],
  ["duet","t",3,"A TikTok feature that places your video beside another creator's.","I duetted her dance."],
  ["stitch","t",3,"A TikTok feature that clips part of another video into yours.","Stitch this with your reaction."],
  ["shadowban","t",3,"Reportedly limiting a post's reach without telling the user.","My views dropped. Am I shadowbanned?"],
  ["fanum tax","t",3,"Taking a bite of a friend's food; named after streamer Fanum.","Pay the fanum tax if you want a seat."],
  ["girl dinner","t",3,"A snack-style meal assembled from random bits; a 2023 trend.","Cheese, crackers and pickles. Girl dinner."],
  ["GRWM","t",3,"Get ready with me; videos filming a routine.","GRWM for my first day of school."],
  ["gyatt","t",3,"An exclamation reacting to someone's figure; often used as a joke.","He yelled 'gyatt' at the new sports car."],
  ["skibidi","t",4,"Nonsense word from the Skibidi Toilet video series, used for absurd humor.","What does skibidi even mean? Nothing. That's the joke."],
  ["mewing","t",3,"A tongue-posture technique claimed to sharpen the jawline.","He's mewing in every photo."],
  ["mogging","t",3,"Outshining someone with superior looks.","He walked in and mogged the whole room."],
  // ---- Memes ----
  ["brainrot","m",5,"Low-quality online content, or its effect on your mind. Oxford's 2024 Word of the Year.","Six hours of short videos gave me brainrot."],
  ["sigma","m",4,"A lone-wolf, independent type; usually used ironically.","He ate lunch alone. Sigma behavior."],
  ["based","m",4,"Unbothered by opinion and true to yourself.","Wearing socks with sandals? Based."],
  ["cringe","m",4,"So awkward or embarrassing it makes you wince.","Reading my old posts is cringe."],
  ["doge","m",3,"A meme of a Shiba Inu with broken-English captions.","Such wow. Very doge."],
  ["rickroll","m",3,"A prank tricking someone into clicking a link to a Rick Astley video.","That link was a rickroll."],
  ["stonks","m",3,"Deliberately misspelled 'stocks', mocking questionable investing.","Bought high, sold low. Stonks."],
  ["Karen","m",3,"A stereotype of an entitled person who demands the manager.","Karen asked for the manager over a coupon."],
  ["copium","m",3,"Coping, imagined as a drug you inhale.","Our team is losing but I'm on copium."],
  ["ok boomer","m",3,"A dismissive reply to condescension from older generations.","Back in my day... Ok boomer."],
  ["yapping","m",4,"Talking at length, often without much point.","He's been yapping for twenty minutes."],
  ["bruh","m",5,"An expression of disbelief or disappointment.","Bruh, you left the oven on?"],
  ["normie","m",3,"Someone with mainstream, unremarkable tastes.","Normies don't get this meme."],
  ["emotional damage","m",3,"Catchphrase from a 2022 viral video, said after being shocked or hurt.","That price was emotional damage."],
  ["Ohio","m",4,"A joke setting for weird or cursed things: 'only in Ohio'.","A chicken in a taxi? Only in Ohio."],
  ["gigachad","m",3,"An exaggerated ideal of masculine confidence from meme images.","He parked perfectly on the first try. Gigachad."],
  // ---- Internet Slang ----
  ["LOL","i",5,"Laughing out loud.","LOL, that cat video is perfect."],
  ["LMAO","i",4,"A stronger LOL; very funny.","LMAO, I can't breathe."],
  ["BRB","i",3,"Be right back.","BRB, my pizza is here."],
  ["IDK","i",4,"I don't know.","IDK what to watch tonight."],
  ["TBH","i",4,"To be honest.","TBH, I liked the first season more."],
  ["SMH","i",3,"Shaking my head; disappointed or disbelieving.","He texted back 'k'. SMH."],
  ["FOMO","i",4,"Fear of missing out.","I went to the party out of FOMO."],
  ["IRL","i",3,"In real life.","We've only talked online, never IRL."],
  ["DM","i",4,"Direct message; a private message on social media.","Slide into my DMs."],
  ["TL;DR","i",3,"Too long; didn't read. Also used to label a summary.","TL;DR: the update broke everything."],
  ["ICYMI","i",3,"In case you missed it.","ICYMI, the finale airs tonight."],
  ["IYKYK","i",3,"If you know, you know; an inside joke.","That sandwich place downtown, IYKYK."],
  ["TFW","i",2,"That feeling when.","TFW your code works on the first try."],
  ["YOLO","i",3,"You only live once; a justification for risky fun.","I'm trying skydiving. YOLO."],
  ["doomscrolling","i",4,"Endlessly scrolling through bad news or content.","I was doomscrolling until 3 a.m."],
  ["lurker","i",3,"Someone who reads online communities without posting.","I've been a lurker in this forum for years."],
  ["troll","i",4,"Someone who posts to provoke or upset others.","Don't feed the troll."],
  ["clout","i",4,"Influence or social status online.","He did it all for clout."],
  ["finsta","i",3,"A private 'fake' Instagram account for close friends.","I only post the messy stuff on my finsta."],
  ["catfish","i",3,"Someone who pretends to be someone else online.","Her online date turned out to be a catfish."],
  ["ratio","i",4,"When replies to a post outnumber its likes, signaling disapproval.","His tweet got ratioed."],
  ["link in bio","i",3,"A pointer to the link on a profile, since posts can't hold clickable links.","Full recipe? Link in bio."],
];
const WORDS = RAW.map(([word, cat, pop, def, ex]) => ({ word, cat, pop, def, ex }));

// Translator data: single words, then multi-word phrases (phrases run first)
const SLANG = {
  hello:"yo", hi:"yo", hey:"yo", really:"highkey", very:"highkey", honestly:"no cap", truly:"no cap",
  good:"bussin", nice:"bussin", great:"fire", amazing:"fire", awesome:"fire", excellent:"fire",
  bad:"mid", boring:"mid", average:"mid", ordinary:"mid", friend:"bestie", friends:"besties",
  suspicious:"sus", weird:"sus", yes:"bet", okay:"bet", ok:"bet", sure:"bet", lie:"cap", lying:"cap",
  win:"W", won:"W", success:"W", failure:"L", embarrassing:"cringe", angry:"salty", upset:"salty", mad:"salty",
  shocked:"shook", surprised:"shook", gossip:"tea", clothes:"drip", outfit:"drip", charm:"rizz",
  tired:"cooked", money:"bread", throw:"yeet", best:"goated", beautiful:"snatched", pretty:"snatched",
  cool:"hits different", work:"grind", boss:"sigma", dinner:"girl dinner", ridiculous:"goofy ahh"
};
const PHRASES = [
  ["go outside","touch grass"], ["i love","I stan"], ["show off","flex"], ["to be honest","ngl"],
  ["for real","fr"], ["best friend","bestie"], ["i think","I lowkey think"], ["the best","the goat"]
];
const PREFIXES = ["Ngl,", "Lowkey,", "Bro,", "Bestie,", "Fr fr,"];
const ENDINGS = {
  1: [", no cap", " fr", " lowkey", ", ngl"],
  2: [", it's giving main character energy", " 💀", ", periodt", " and that's the tea"],
  3: [" 🗣️🔥", ", that's so Ohio", " (+1000 aura)", ", skibidi rizz activated", " no cap fr fr"]
};/* ================= 2. HELPERS ================= */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
function shuffle(a) { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
// localStorage wrappers that never crash (private mode, blocked storage)
function load(k, fallback) { try { const v = localStorage.getItem(k); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }

let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch { // fallback for older browsers / non-secure contexts
    const a = document.createElement("textarea"); a.value = text; a.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(a); a.select(); try { document.execCommand("copy"); } catch {} a.remove();
  }
  toast("Copied to clipboard ✨");
}
async function shareText(title, text) {
  try { await navigator.share({ title, text }); }
  catch (e) { if (e.name !== "AbortError") copyText(text); }
}
if (!navigator.share) document.documentElement.classList.add("no-share"); // hides share buttons

const byWord = w => WORDS.find(x => x.word === w);
const cardText = w => `${w.word} (${CATS[w.cat]}): ${w.def}\nExample: "${w.ex}"\n— Brainrot Dictionary`;
const pips = n => Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("");

/* ================= 3. DICTIONARY ================= */
const state = { q: "", cat: "all" };
let favs = load("br_favs", []);

function actionBtns(word) {
  const on = favs.includes(word), w = esc(word);
  return `<button class="icon-btn" data-act="fav" data-word="${w}" aria-pressed="${on}" aria-label="Bookmark ${w}">${on ? "★" : "☆"}</button>
          <button class="btn ghost sm" data-act="copy" data-word="${w}">📋 Copy</button>
          <button class="btn ghost sm share-btn" data-act="share" data-word="${w}">↗ Share</button>`;
}
function cardHTML(w, i = 0) {
  return `<article class="card glass" style="--i:${Math.min(i, 12)}">
    <div class="card-top"><span class="badge b-${w.cat}">${CATS[w.cat]}</span>
      <span class="pips" role="img" aria-label="Popularity ${w.pop} out of 5">${pips(w.pop)}</span></div>
    <h3>${esc(w.word)}</h3>
    <p class="def">${esc(w.def)}</p>
    <p class="ex">“${esc(w.ex)}”</p>
    <div class="actions">${actionBtns(w.word)}</div>
  </article>`;
}
function renderChips() {
  const items = [["all", "All"], ...Object.entries(CATS)];
  $("#chips").innerHTML = items.map(([k, n]) =>
    `<button class="chip" data-cat="${k}" aria-pressed="${state.cat === k}">${n}</button>`).join("");
}
function renderSkeleton() { $("#grid").innerHTML = Array(6).fill('<div class="skel" aria-hidden="true"></div>').join(""); $("#count").textContent = "Loading the lexicon…"; }
function renderGrid() {
  const q = state.q.trim().toLowerCase();
  const rank = w => (w.word.toLowerCase() === q ? 3 : w.word.toLowerCase().startsWith(q) ? 2 : w.word.toLowerCase().includes(q) ? 1 : 0);
  let list = WORDS.filter(w => (state.cat === "all" || w.cat === state.cat) &&
    (!q || w.word.toLowerCase().includes(q) || w.def.toLowerCase().includes(q)));
  list.sort(q ? (a, b) => rank(b) - rank(a) || b.pop - a.pop : (a, b) => b.pop - a.pop || a.word.localeCompare(b.word));
  $("#grid").innerHTML = list.map(cardHTML).join("");
  $("#count").textContent = `${list.length} word${list.length === 1 ? "" : "s"}${q ? ` matching “${state.q.trim()}”` : ""}`;
  $("#empty").hidden = list.length > 0;
}

/* ================= 4. SPOTLIGHT (word of the day / random) ================= */
// Same date → same hash → same word all day
function dayIndex() {
  const d = new Date(), s = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % WORDS.length;
}
let spotWord = null;
function renderSpot(w, label, isRandom = false) {
  spotWord = w;
  const s = $("#spot");
  s.innerHTML = `<div class="spot-head"><span class="label">${label}</span>
      ${isRandom ? '<button class="btn ghost sm" data-act="today">← Today’s word</button>' : `<span class="badge b-${w.cat}">${CATS[w.cat]}</span>`}</div>
    <h2 class="spot-word">${esc(w.word)}</h2>
    <p class="def">${esc(w.def)}</p><p class="ex">“${esc(w.ex)}”</p>
    <div class="actions">${actionBtns(w.word)}</div>`;
  s.classList.remove("pop"); void s.offsetWidth; s.classList.add("pop"); // replay animation
}/* ================= 5. FAVORITES & CARD ACTIONS ================= */
function refreshFavUI() {
  $$('[data-act="fav"]').forEach(b => {
    const on = favs.includes(b.dataset.word);
    b.setAttribute("aria-pressed", on); b.textContent = on ? "★" : "☆";
  });
  const c = $("#favCount"); c.textContent = favs.length; c.hidden = !favs.length;
}
function renderFavs() {
  const list = WORDS.filter(w => favs.includes(w.word));
  $("#favGrid").innerHTML = list.map(cardHTML).join("");
  $("#favEmpty").hidden = list.length > 0;
  $("#clearFavs").hidden = list.length === 0;
  refreshFavUI();
}
// One click listener handles every card button (event delegation)
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act === "today") return renderSpot(WORDS[dayIndex()], "Word of the day");
  const w = byWord(b.dataset.word); if (!w) return;
  if (act === "fav") {
    favs = favs.includes(w.word) ? favs.filter(x => x !== w.word) : [...favs, w.word];
    save("br_favs", favs);
    toast(favs.includes(w.word) ? "Saved ⭐" : "Removed from saved");
    if (!$("#view-favorites").hidden) renderFavs(); else refreshFavUI();
  } else if (act === "copy") copyText(cardText(w));
  else if (act === "share") shareText(`${w.word} — Brainrot Dictionary`, cardText(w));
});
$("#clearFavs").addEventListener("click", () => {
  if (!confirm("Remove all saved words?")) return;
  favs = []; save("br_favs", favs); renderFavs();
});

/* ================= 6. TRANSLATOR ================= */
function translate(text, level) {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chance = [0, .5, .85, 1][level];
  const pool = [...ENDINGS[1], ...(level > 1 ? ENDINGS[2] : []), ...(level > 2 ? ENDINGS[3] : [])];
  const out = sentences.map(raw => {
    let s = raw.trim(); if (!s) return "";
    const m = s.match(/[.!?]+$/), end = m ? m[0] : "";
    s = s.slice(0, s.length - end.length);
    PHRASES.forEach(([a, b]) => { s = s.replace(new RegExp("\\b" + a + "\\b", "gi"), b); }); // phrases first
    s = s.replace(/[A-Za-z']+/g, w => { const k = w.toLowerCase(); return Object.hasOwn(SLANG, k) ? SLANG[k] : w; }); // then words
    if (level >= 2 && Math.random() < .6) {
      if (!/^I\b/.test(s)) s = s.charAt(0).toLowerCase() + s.slice(1);
      s = pick(PREFIXES) + " " + s;
    }
    if (Math.random() < chance) s += pick(pool);
    return s.charAt(0).toUpperCase() + s.slice(1) + (end || ".");
  }).join(" ");
  return level === 3 ? out + " " + pick(["💀💀💀", "🗣️🔥", "😭🙏"]) : out;
}
function runTranslate() {
  const txt = $("#tIn").value.trim();
  if (!txt) { toast("Type something first, bestie"); $("#tIn").focus(); return; }
  const btn = $("#tGo"); btn.disabled = true; btn.classList.add("loading"); btn.textContent = "Cooking…";
  setTimeout(() => { // short fake-free delay: just a loading state for feel
    $("#tOut").textContent = translate(txt, +$("#tLevel").value);
    $("#tOutWrap").hidden = false;
    btn.disabled = false; btn.classList.remove("loading"); btn.textContent = "Translate";
  }, 600);
}
$("#tGo").addEventListener("click", runTranslate);
$("#tAgain").addEventListener("click", runTranslate);
$("#tIn").addEventListener("keydown", e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) runTranslate(); });
$("#samples").addEventListener("click", e => {
  const c = e.target.closest("[data-s]"); if (!c) return;
  $("#tIn").value = c.dataset.s; runTranslate();
});
$("#tCopy").addEventListener("click", () => copyText($("#tOut").textContent));
$("#tShare").addEventListener("click", () => shareText("Brainrot Translator", $("#tOut").textContent + "\n— Brainrot Dictionary"));/* ================= 7. QUIZ ================= */
const TIERS = [
  [10, "Brainrot Final Boss", "Terminally online. Your screen time has screen time. Please touch grass (one blade, for science)."],
  [8, "Chronically Online", "The FYP raised you. You speak fluent Gen-Z and probably dream in memes."],
  [6, "Respectable Rizz", "Not bad! You know your stuff, but you still pause before saying 'skibidi' in public."],
  [4, "Casual Scroller", "NPC with potential. A few more late-night scroll sessions and you'll ascend."],
  [0, "Grandparent Mode", "Unlocked: asking your younger cousin what everything means. We believe in you."]
];
const quiz = { list: [], i: 0, score: 0, locked: false };
const box = $("#quizBox");

function renderQuizIntro() {
  const best = load("br_best", null);
  box.innerHTML = `<div class="result"><div class="score" aria-hidden="true">?</div>
    <h3 class="q">Think you speak fluent brainrot?</h3>
    <p>10 random words. Four definitions each. Only one is real.${best !== null ? ` Your best: <b>${best}/10</b>.` : ""}</p>
    <button class="btn" data-quiz="start">Start quiz</button></div>`;
}
function startQuiz() {
  quiz.list = shuffle(WORDS).slice(0, 10).map(w => ({
    w, opts: shuffle([w.def, ...shuffle(WORDS.filter(x => x !== w)).slice(0, 3).map(x => x.def)])
  }));
  quiz.i = 0; quiz.score = 0; renderQuestion();
}
function renderQuestion() {
  const q = quiz.list[quiz.i]; quiz.locked = false;
  box.innerHTML = `<div class="qhead"><span>Question ${quiz.i + 1} / 10</span><span>Score ${quiz.score}</span></div>
    <div class="bar"><i style="width:${quiz.i * 10}%"></i></div>
    <h3 class="q">What does <em>${esc(q.w.word)}</em> mean?</h3>
    <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
    <div id="fb" aria-live="polite"></div>`;
  $(".opt", box).focus({ preventScroll: true });
}
function answer(k) {
  if (quiz.locked) return; quiz.locked = true;
  const q = quiz.list[quiz.i], right = q.opts[k] === q.w.def;
  if (right) quiz.score++;
  $$(".opt", box).forEach((b, idx) => {
    b.disabled = true;
    if (q.opts[idx] === q.w.def) b.classList.add("correct");
    else if (idx === k) b.classList.add("wrong");
  });
  const last = quiz.i === 9;
  $("#fb").innerHTML = `<p>${right ? "✅ <b>Correct!</b>" : "❌ <b>Not quite.</b>"} <span class="ex">“${esc(q.w.ex)}”</span></p>
    <button class="btn" data-quiz="next" id="nextBtn">${last ? "See results" : "Next question →"}</button>`;
  $("#nextBtn").focus();
}
function showResults() {
  const s = quiz.score, tier = TIERS.find(t => s >= t[0]);
  const best = Math.max(s, load("br_best", 0)); save("br_best", best);
  box.innerHTML = `<div class="result"><span class="label">Your rank</span><div class="score">${s}/10</div>
    <h3 class="q">${tier[1]}</h3><p>${tier[2]}</p><p>Best score: <b>${best}/10</b></p>
    <div class="actions"><button class="btn" data-quiz="start">Play again</button>
    <button class="btn ghost share-btn" data-quiz="share">Share score</button></div></div>`;
}
box.addEventListener("click", e => {
  const opt = e.target.closest(".opt"), act = e.target.closest("[data-quiz]");
  if (opt) return answer(+opt.dataset.k);
  if (!act) return;
  if (act.dataset.quiz === "start") startQuiz();
  else if (act.dataset.quiz === "next") { quiz.i++; quiz.i < 10 ? renderQuestion() : showResults(); }
  else if (act.dataset.quiz === "share") shareText("Brainrot Quiz", `I scored ${quiz.score}/10 on the Brainrot Dictionary quiz. Can you beat me?`);
});

/* ================= 8. NAVIGATION, THEME & STARTUP ================= */
function show(view) {
  $$(".view").forEach(v => v.hidden = v.id !== "view-" + view);
  $$(".tab").forEach(t => t.dataset.view === view ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current"));
  if (view === "favorites") renderFavs();
  if (view === "quiz" && !box.innerHTML.trim()) renderQuizIntro();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("click", e => { const t = e.target.closest("[data-view]"); if (t) show(t.dataset.view); });

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  $("#themeBtn").textContent = t === "dark" ? "☀️" : "🌙";
  $("#themeBtn").setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  $('meta[name="theme-color"]').setAttribute("content", t === "dark" ? "#050507" : "#f6f3fb");
}
$("#themeBtn").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next); save("br_theme", next);
});

// Search, filters, random
$("#search").addEventListener("input", e => { state.q = e.target.value; renderGrid(); });
$("#chips").addEventListener("click", e => {
  const c = e.target.closest("[data-cat]"); if (!c) return;
  state.cat = c.dataset.cat; renderChips(); renderGrid();
});
$("#resetBtn").addEventListener("click", () => {
  state.q = ""; state.cat = "all"; $("#search").value = ""; renderChips(); renderGrid(); $("#search").focus();
});
$("#randomBtn").addEventListener("click", () => {
  let w; do { w = pick(WORDS); } while (w === spotWord);
  renderSpot(w, "Random pick", true);
  $("#spot").scrollIntoView({ behavior: "smooth", block: "center" });
});
// "/" focuses search, Escape clears it
document.addEventListener("keydown", e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  if (e.key === "/" && !typing) { e.preventDefault(); show("dictionary"); $("#search").focus(); }
  if (e.key === "Escape" && document.activeElement === $("#search")) { $("#search").value = ""; state.q = ""; renderGrid(); }
});

// Startup
applyTheme(load("br_theme", "dark"));
renderChips();
renderSkeleton();                                   // loading state
renderSpot(WORDS[dayIndex()], "Word of the day");
refreshFavUI();
setTimeout(renderGrid, 650);                        // reveal the grid after a short load