import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";

import img1 from "./Images/1.jpeg";
import img2_1 from "./Images/2.1.jpeg";
import img2 from "./Images/2.jpeg";
import img3 from "./Images/3.jpeg";
import img4 from "./Images/4.jpeg";
import img5 from "./Images/5.jpeg";
import img6 from "./Images/6.jpeg";
import img7 from "./Images/7.jpeg";
import img8 from "./Images/8.jpeg";
import img9 from "./Images/9.jpeg";
import img10 from "./Images/10.jpeg";
import img11 from "./Images/11.jpeg";
import img12 from "./Images/12.jpg";
import img13 from "./Images/13.jpeg";
import img14 from "./Images/14.jpeg";
import img15 from "./Images/15.jpeg";
import img16 from "./Images/16.jpeg";
import img17 from "./Images/17.jpeg";
import img18 from "./Images/18.jpeg";
import img19 from "./Images/19.jpeg";
import img20 from "./Images/20.jpeg";

/* ================= STORY DATA ================= */
const storyData = [
  { id: 1, image: img1, chapter: "Chapter One", title: "A Happy Extrovert Girl", act: "act1", mood: "happy",
    shayari: `She laughed like sunlight spilling through windows,\nTalked to strangers like they were old friends.\nThe world was her stage, and every day — a song,\nShe never knew silence could ever feel wrong.` },
  { id: 2, image: img2_1, chapter: "Chapter Two", title: "She Writes Shayaris", act: "act1", mood: "happy",
    shayari: `In a little notebook, hidden from sight,\nShe poured out her heart every single night.\nWords she couldn't speak, feelings she couldn't show,\nHer shayaris became the only place she'd go.` },
  { id: 3, image: img2, chapter: "Chapter Three", title: "She Meets A Stranger", act: "act1", mood: "happy",
    shayari: `One ordinary evening, one ordinary office,\nA stranger's smile across her desk's front.\nShe asked for a chai, he hesitated, said yes,\nAnd then life had just begun,\nTo write a story that should never be undone.` },
  { id: 4, image: img3, chapter: "Chapter Four", title: "An Introvert Guy", act: "act1", mood: "happy",
    shayari: `He spoke in whispers, looked down when he smiled,\nCarried a silence that felt like a child.\nShe was the storm, he was the calm in the sea,\nTwo different worlds — meant to be.` },
  { id: 5, image: img4, chapter: "Chapter Five", title: "Gets Her Diary", act: "act1", mood: "happy",
    shayari: `One day she handed her little diary to him.\n"I write what I feel, I can't say it out loud,"\nShe gave it to a stranger — quiet and proud.` },
  { id: 6, image: img5, chapter: "Chapter Six", title: "Reads Her Diary", act: "act1", mood: "happy",
    shayari: `Page after page, he felt her pain,\nHer hidden storms, her silent rain.\nHe realised then, in that quiet room,\nHer smile was a mask for a quiet gloom.` },
  { id: 7, image: img6, chapter: "Chapter Seven", title: "He Started Writing", act: "act2", mood: "calm",
    shayari: `He picked up a pen he never thought he'd hold,\nWrote her a shayari, shy and bold.\nFor the first time in years, words found his hand,\nA language he never knew he'd understand.` },
  { id: 8, image: img7, chapter: "Chapter Eight", title: "Both Started Writing", act: "act2", mood: "calm",
    shayari: `Two pens, two hearts, one beautiful rhyme,\nTheir notebooks filled, one line at a time.\nThey wrote of stars, of dreams, of fears,\nOf laughter, of loss, of unshed tears.` },
  { id: 9, image: img8, chapter: "Chapter Nine", title: "Talks All Day, All Night", act: "act2", mood: "calm",
    shayari: `Messages at midnight, calls at dawn,\nTheir voices tangled like a favourite song.\nThe world slept on, but they stayed awake,\nWriting a story only they could make.` },
  { id: 10, image: img9, chapter: "Chapter Ten", title: "Hanging Out As Friends", act: "act2", mood: "calm",
    shayari: `Coffee shops, long walks, and silly fights,\nEndless laughter under city lights.\nJust two friends — or so they'd say,\nWhile something deeper grew each day.` },
  { id: 11, image: img10, chapter: "Chapter Eleven", title: "He Makes Her Sketch", act: "act2", mood: "calm",
    shayari: `With a pencil and patience, he drew her face,\nEvery line, every curve, every hidden grace.\nShe looked at it speechless — eyes wet and bright,\n"You made me look beautiful." — "You always were." that night.` },
  { id: 12, image: img11, chapter: "Chapter Twelve", title: "The Headphone Gift", act: "act2", mood: "calm",
    shayari: `He gifted her headphones, quiet and small,\n"For the days you don't want to talk at all."\nShe wore them like armour, like a soft, safe place,\nWhere her shayaris could breathe without a trace.` },
  { id: 13, image: img12, chapter: "Chapter Thirteen", title: "Then The Fight Began", act: "act3", mood: "shock",
    shayari: `One misunderstanding, one careless word,\nA silence louder than anything heard.\nPride spoke first, and hurt spoke fast,\nAnd a beautiful friendship became the past.` },
  { id: 14, image: img13, chapter: "Chapter Fourteen", title: "Everything Went Wrong", act: "act4", mood: "sad",
    shayari: `The chats went cold, the calls went dead,\nOnly her diary knew what she said.\nEverything they built — shattered, torn,\nLeft her questioning why she was ever born.` },
  { id: 15, image: img14, chapter: "Chapter Fifteen", title: "I Know You Are Hurt", act: "act4", mood: "sad",
    shayari: `I know you're hurting — more than words can hold,\nI know your heart feels heavy, dark and cold.\nI'm not here to justify or defend,\nI'm here because I never wanted this end.` },
  { id: 16, image: img15, chapter: "Chapter Sixteen", title: "I Am Trying My Best", act: "act4", mood: "sad",
    shayari: `I'm trying my best — in ways you can't see,\nTo become the person you needed me to be.\nEvery apology I write, every tear I hide,\nCarries the weight of the day you cried.` },
  { id: 17, image: img16, chapter: "Chapter Seventeen", title: "She Is So Sad", act: "act4", mood: "sad",
    shayari: `She smiles at the world, but her eyes don't lie,\nThere's a storm behind every "I'm fine, don't ask why."\nShe reads old messages she'll never send,\nWondering if broken hearts ever really mend.` },
  { id: 18, image: img17, chapter: "Chapter Eighteen", title: "She Can't Handle It", act: "act4", mood: "sad",
    shayari: `It's too heavy now — the silence, the pain,\nEvery memory falls like unforgiving rain.\nShe closes her diary, holds it to her chest,\nAnd whispers to the dark, "I tried my best."` },
  { id: 19, image: img18, chapter: "Chapter Nineteen", title: "The Emptiness", act: "act4", mood: "sad",
    shayari: `The headphones hang silent, the sketch gathers dust,\nThe shayaris sit waiting, covered in rust.\nShe waits for a message that never arrives,\nAnd slowly, quietly, she just survives.` },
  { id: 20, image: img19, chapter: "Chapter Twenty", title: "One Last Wish", act: "act4", mood: "sad",
    shayari: `If you ever read this, know that I cared,\nKnow that I'm sorry for the silence we shared.\nNot every ending is a goodbye,\nSometimes it's just a tired heart's sigh.` },
];

const lastChapter = {
  id: 21,
  image: img20,
  chapter: "The Last Page",
  title: "A Very Big Sorry",
  shayari: `I'm sorry — for every word I couldn't say,\nFor every moment I pushed you away.\nI'm sorry for the hurt, the doubt, the tears,\nFor all the nights you faced alone your fears.\n\nYou deserved a better friend than me,\nSomeone who'd stay, who'd fight, who'd see.\nBut if you ever find it in your heart,\nTo let this broken friendship restart…\n\nI'll be here. Waiting. Quiet. True.\nWith a sorry that belongs only to you.`,
};

const lyrics = [
  { t: 0, line: "" },
  { t: 4, line: "I get weak for your smile…" },
  { t: 9, line: "Every time you look my way," },
  { t: 14, line: "I forget the words to say…" },
  { t: 19, line: "I get weak for your smile…" },
  { t: 25, line: "And I know it's not the same," },
  { t: 30, line: "But I'd do it all again…" },
  { t: 36, line: "I get weak for your smile…" },
  { t: 44, line: "" },
];

/* ================= TYPEWRITER ================= */
function Typewriter({ text, speed = 22, className = "" }) {
  const [shown, setShown] = useState("");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setShown("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [visible, text, speed]);

  return (
    <p ref={ref} className={className}>
      {shown.split("\n").map((line, i) =>
        line.trim() === "" ? <span key={i} className="line blank" /> : <span key={i} className="line">{line}</span>
      )}
    </p>
  );
}

/* ================= SCENE ================= */
function Scene({ item, onMood }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          onMood(item.mood);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [item.mood, onMood]);

  return (
    <section ref={ref} className={`scene ${item.act} ${inView ? "in-view" : ""}`} id={`ch-${item.id}`}>
      <div className="scene-top">
        <span className="scene-num">SCENE {String(item.id).padStart(2, "0")} / 21</span>
        <span className="scene-time">⏺ 00:{String(item.id).padStart(2, "0")}:00</span>
      </div>

      <div className="scene-body">
        <div className="film-frame">
          <div className="frame-photo">
            <img src={item.image} alt={item.title} loading="lazy" />
            {item.id === 13 && <div className="crack" />}
            <div className="grain" />
            <div className="vignette" />
            <div className="frame-shine" />
          </div>
          <div className="frame-caption">
            <span className="frame-icon">◉</span>
            <span>{item.title}</span>
          </div>
        </div>

        <div className="scene-text">
          <p className="chapter-label">{item.chapter}</p>
          <h2 className="chapter-title">{item.title}</h2>
          <div className="divider"><span /><i>❦</i><span /></div>
          <Typewriter text={item.shayari} speed={item.act === "act4" ? 50 : 22} className="shayari" />
          {item.id === 13 && <p className="reel-damaged"><span className="warning-icon">⚠</span> REEL DAMAGED</p>}
        </div>
      </div>
    </section>
  );
}

/* ================= SONG PLAYER ================= */
function SongPlayer({ active }) {
  const [line, setLine] = useState("");
  const [time, setTime] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const t = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setTime(elapsed);
      const found = [...lyrics].reverse().find((l) => l.t <= elapsed);
      setLine(found ? found.line : "");
    }, 500);
    return () => clearInterval(t);
  }, [active]);

  if (!active) return null;

  return (
    <div className={`song-player ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(!expanded)}>
      <div className="song-visualizer">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="viz-bar" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
      <div className="song-note">♪</div>
      <div className="song-content">
        <div className="song-line">{line || "…"}</div>
        <div className="song-time">
          {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
        </div>
      </div>
      <div className="song-progress">
        <div className="song-progress-fill" style={{ width: `${Math.min((time / 44) * 100, 100)}%` }} />
      </div>
    </div>
  );
}

/* ================= LETTER ================= */
function Letter({ onMood }) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && onMood("hope"), { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onMood]);

  useEffect(() => {
    if (!open) return;
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(lastChapter.shayari.slice(0, i));
      if (i >= lastChapter.shayari.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [open]);

  return (
    <section ref={ref} className={`letter-scene ${open ? "open" : ""}`}>
      <div className="dust">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${12 + Math.random() * 12}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="letter-glow" />
      <div className="letter-aurora" />

      {!open ? (
        <button className="chit" onClick={() => setOpen(true)}>
          <span className="chit-fold line1" />
          <span className="chit-fold line2" />
          <span className="chit-wax"><span className="wax-inner">♥</span></span>
          <span className="chit-text">A VERY BIG SORRY</span>
          <span className="chit-hint">— click to open —</span>
          <span className="chit-glow" />
        </button>
      ) : (
        <div className="letter-open">
          <div className="letter-paper">
            <p className="chapter-label">{lastChapter.chapter}</p>
            <h2 className="chapter-title">{lastChapter.title}</h2>
            <div className="letter-divider"><span /><i>❦</i><span /></div>
            <div className="letter-body">
              {typed.split("\n").map((line, i) =>
                line.trim() === "" ? (
                  <span key={i} className="letter-line letter-blank" />
                ) : (
                  <span key={i} className="letter-line">{line}</span>
                )
              )}
            </div>
            <p className="rewrite-line">We Can Still Rewrite This</p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= PROMISE ================= */
function PromiseScene({ onMood }) {
  const [called, setCalled] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          onMood("stand");
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onMood]);

  return (
    <section ref={ref} className={`promise-scene ${visible ? "in-view" : ""}`}>
      <div className="promise-stars">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="promise-inner">
        <p className="p-small">One day you promised me —</p>

        <div className="promise-quote-box">
          <p className="p-quote">
            "Whenever you're in problem,<br />
            or feel too down…<br />
            come to me.<br />
            I'm here to take that promise from you."
          </p>
        </div>

        <div className="promise-sequence">
          <p className="p-mid">I'm not asking for love this time.</p>
          <p className="p-mid">I'm not asking for forever.</p>
        </div>

        <p className="p-soft">I'm asking —</p>

        <p className="p-big">
          Can we be caring strangers again?<br />
          <span className="p-big-sub">Like before we met?</span>
        </p>

        <p className="p-mid p-emphasis">I can't handle this silence anymore.</p>

        <p className="p-call">Please… call me once.</p>
        <p className="p-mid">Just once.</p>
        <p className="p-mid">And I promise — I'll fix everything.</p>
      </div>

      {!called ? (
        <button className="call-btn" onClick={() => setCalled(true)}>
          <span className="phone">📞</span>
          <span className="call-label">call me once</span>
          <span className="pulse-ring" />
          <span className="pulse-ring delay" />
          <span className="btn-glow" />
        </button>
      ) : (
        <div className="call-happening">
          <div className="ringing">
            <span className="ring-dot" />
            <span className="ring-dot" />
            <span className="ring-dot" />
          </div>
          <p className="ring-sub">calling… waiting for you.</p>
        </div>
      )}
    </section>
  );
}

/* ================= ENDING ================= */
function Ending() {
  return (
    <section className="ending">
      <div className="ending-glow" />
      <p className="end-line">We can still rewrite this.</p>
      <div className="end-options">
        <p className="end-sub">— strangers again?</p>
        <span className="end-or">or</span>
        <p className="end-sub end-sub-highlight">— caring strangers, like before?</p>
      </div>
      <div className="end-credit">
        <span className="credit-line" />
        <p>THE LAST SHOW</p>
        <span className="credit-line" />
      </div>
    </section>
  );
}

/* ================= APP ================= */
export default function App() {
  const [intro, setIntro] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [progress, setProgress] = useState(0);
  const [mood, setMood] = useState("calm");
  const [songOn, setSongOn] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!intro) return;
    const steps = ["3", "2", "1", "▶"];
    let i = 0;
    setCountdown(steps[0]);
    const t = setInterval(() => {
      i++;
      if (i < steps.length) setCountdown(steps[i]);
      else {
        clearInterval(t);
        setIntro(false);
        setSongOn(true);
      }
    }, 900);
    return () => clearInterval(t);
  }, [intro]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const s = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(s * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleMood = useCallback((m) => setMood(m), []);
  const moodClass = useMemo(() => `mood-${mood}`, [mood]);

  return (
    <div className={`app ${moodClass}`}>
      <div className="film-grain" />
      <div className="letterbox top" />
      <div className="letterbox bottom" />
      <div className="projector-beam" />
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {intro && (
        <div className="intro">
          <div className="intro-flicker" />
          <div className="intro-lines">
            <span className="intro-line" />
            <span className="intro-line" />
            <span className="intro-line" />
          </div>
          <div className="countdown">{countdown}</div>
        </div>
      )}

      <div className="reel-bar">
        <div className="reel-fill" style={{ width: `${progress}%` }}>
          <span className="reel-head" />
        </div>
      </div>

      <header className="app-header">
        <div className="header-badge">A CINEMATIC STORY</div>
        <h1 className="app-title">We Can Still Rewrite This</h1>
        <p className="app-tagline">a story that only you can see</p>
        <div className="header-scroll-hint">
          <span className="scroll-mouse"><span className="scroll-wheel" /></span>
          <span className="scroll-text">scroll to begin</span>
        </div>
      </header>

      <main className="reel">
        {storyData.map((item) => (
          <Scene key={item.id} item={item} onMood={handleMood} />
        ))}
        <Letter onMood={handleMood} />
        <PromiseScene onMood={handleMood} />
        <Ending />
      </main>

      <SongPlayer active={songOn} />

      <footer className="app-footer">
        <div className="footer-line" />
        <p>© {new Date().getFullYear()} · Every word here is a heartbeat</p>
      </footer>
    </div>
  );
}