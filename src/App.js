import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";
import img1 from "./Images/1.jpeg";
import video2_1 from "./Images/2.1video.mp4";
import img2 from "./Images/2.jpeg";
import img3 from "./Images/3.jpeg";
import img4 from "./Images/4.jpeg";
import img5 from "./Images/5.jpg";
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
import img21 from "./Images/21.jpg";
import img22 from "./Images/22.jpg";
import img23 from "./Images/23.jpg";
import img24 from "./Images/24.jpg";
import img25 from "./Images/25.jpg";
import img26 from "./Images/26.jpg";
import img27 from "./Images/27.jpg";
import img28 from "./Images/28.jpg";
import img29 from "./Images/29.jpg";
import img30 from "./Images/30.jpg";
import img31 from "./Images/31.jpg";
import img32 from "./Images/32.jpg";
import img33 from "./Images/33.jpg";
import img34 from "./Images/34.jpg";
import img35 from "./Images/35.jpg";

const storyData = [
{ id: 1, image: img1, chapter: "Chapter One", title: "Bhumii, A Happy Extrovert Girl...", act: "act1", mood: "happy",
shayari: `She laughed like sunlight spilling through windows,\nTalked to strangers like they were old friends.\nThe world was her stage, and every day — a song,\nShe never knew silence could ever feel wrong.` },
{ id: 2, video: video2_1, chapter: "Chapter Two", title: "The Hidden Shayarie's She Write's.", act: "act1", mood: "happy",
shayari: `In a little notebook, hidden from sight,\nShe poured out her heart every single night.\nWords she couldn't speak, feelings she couldn't show,\nHer shayaris became the only place she'd go.` },
{ id: 3, image: img2, chapter: "Chapter Three", title: "A Quiet Stranger.", act: "act1", mood: "happy",
shayari: `One ordinary evening, one ordinary office,\nA Quiet stranger's sit's across her desk' front.\nShe asked for a chai, he looked confused, then said yes,\nAnd that's where it all began.\n` },
{ id: 4, image: img3, chapter: "Chapter Four", title: "A Quiet Guy.", act: "act1", mood: "happy",
shayari: `He spoke in whispers, looked down when he smiled,\nCarried a silence that felt like a child.\nShe was the storm, he was the calm in the sea,\nTwo different worlds — meant to be.` },
{ id: 5, image: img4, chapter: "Chapter Five", title: "Get's Her Diary Note'book.", act: "act1", mood: "happy",
shayari: `One day he asked her for her shayari's. she gave him her little diary." quietly, without a word. "I write what I feel, I can't say it out loud," She gave it to a stranger — her whole world that night.` },
{ id: 6, image: img5, chapter: "Chapter Six", title: "Read's Her Heart Through Shayarie's.", act: "act1", mood: "happy",
shayari: `Page after page, he felt her pain,\nHer hidden storms, her silent rain.\nHe realised then, in that quiet room That\n Extrovert girl was empty in her heart, Her\n smile was a mask for a quiet gloom.` },
{ id: 7, image: img6, chapter: "Chapter Seven", title: "The Pen He Never Thought He'd Hold.", act: "act2", mood: "calm",
shayari: `He picked up a pen he never thought he'd hold,\nWrote her a shayari, shy and bold.\nFor the first time in his life, words found his hand,\nA language he never knew he'd understand.` },
{ id: 8, image: img7, chapter: "Chapter Eight", title: "Both Started Writing Shayarie's.", act: "act2", mood: "calm",
shayari: `Two pens, two hearts, one beautiful rhyme,\nTheir thought's filled the pages, one line at a time.\nThey wrote of stars, of dreams, of fears,\nOf laughter, of loss, of unshed tears of love, of  \n silence, Two souls writing what they never said.` },
{ id: 9, image: img8, chapter: "Chapter Nine", title: "The Message's Call's That Never Ended All Day & Night", act: "act2", mood: "calm",
shayari: `Messages at midnight, calls at dawn,\nTheir voices tangled like a favourite song.\nThe world slept on, but they stayed awake,\n Not in love, but something deeper Two people \n who became each other's strength,
Teaching, supporting emotionally, learning about life, \n standing side by side,
In every up and down, in every tide..` },
{ id: 10, image: img9, chapter: "Chapter Ten", title: "Hanging Out as Just Friend's.", act: "act2", mood: "calm",
shayari: `They start's hangout — ,\n Coffee shops, long walks, silly fights, \n Endless laughter under city lights. \n Just two friends -- nothing more, nothing less,
But a quiet comfort grows day by day, When they meet face to face.` },
{ id: 11, image: img10, chapter: "Chapter Eleven", title: "A Pencil, A Paper, He Drew Her Face.", act: "act2", mood: "calm",
shayari: `With a pencil and patience, he drew her face,\nEvery line, every curve, every hidden grace.\nShe looked at it speechless — eyes wet and bright,\n"You made me look beautiful.".` },
{ id: 12, image: img11, chapter: "Chapter Twelve", title: "The Headphone Gift ' From Her.", act: "act2", mood: "calm",
shayari: `She gifted him headphones, quiet and small,\n"For the boy who walked alone through it all."\n He'd listen to songs all day, every day, Lost  \n  in his Music's far away, Now that \n headphones he use's all the day like \n it is a part of his life.` },
{ id: 13, image: img12, chapter: "Chapter Thirteen", title: "Then The Fight Began", act: "act3", mood: "shock",
shayari: `He felt something fo her — she didn't feel the same.
One careless word, and everything changed its name.
A silence louder than anything heard,
Pride spoke first, and hurt spoke fast,
And a beautiful friendship became the past..` },
{ id: 14, image: img13, chapter: "Chapter Fourteen", title: "Everything Went Wrong.", act: "act4", mood: "sad",
shayari: `The chats went cold, the calls went dead,\nOnly her diary knew what she said.\nEverything they built — shattered, torn,\nLeft her questioning why she even talked.` },
{ id: 15, image: img14, chapter: "Chapter Fifteen", title: "I Know It Hurt's.", act: "act4", mood: "sad",
shayari: `I know you're hurting — more than words can hold,\nI know your heart feels heavy, dark and cold.\nI'm not here to justify or defend,\nI'm here because I never wanted this end.` },
// { id: 16, image: img15, chapter: "Chapter Sixteen", title: "I Am Trying My Best", act: "act4", mood: "sad",
// shayari: `I'm trying my best — in ways you can't see,\nTo become the person you needed me to be.\nEvery apology I write, every tear I hide,\nCarries the weight of the day you cried.` },
{ id: 17, image: img16, chapter: "Chapter Seventeen", title: "The Emptine's.", act: "act4", mood: "sad",
shayari: `She smiles at the world, but her eyes don't lie,\nThere's a storm behind every "I'm fine, don't ask why."\n I Know You hate me now but i don't want this end,\n please give me a chance so that every things \n happens again well.` },
// { id: 18, image: img17, chapter: "Chapter Eighteen", title: "She Can't Handle It", act: "act4", mood: "sad",
// shayari: `It's too heavy now — the silence, the pain,\nEvery memory falls like unforgiving rain.\nShe closes her diary, holds it to her chest,\nAnd whispers to the dark, "I tried my best."` },
// { id: 19, image: img18, chapter: "Chapter Nineteen", title: "The Emptiness", act: "act4", mood: "sad",
// shayari: `The headphones hang silent, the sketch gathers dust,\nThe shayaris sit waiting, covered in rust.\nShe waits for a message that never arrives,\nAnd slowly, quietly, she just survives.` },
// { id: 20, image: img19, chapter: "Chapter Twenty", title: "One Last Wish", act: "act4", mood: "sad",
// shayari: `If you ever read this, know that I cared,\nKnow that I'm sorry for the silence we shared.\nNot every ending is a goodbye,\nSometimes it's just a tired heart's sigh.` },
{ id: 21, image: img21, chapter: "Chapter Twenty-One", title: "I Know This Is Where You Belong.", act: "act5", mood: "hope",
shayari: `This isn't the end. This is where your story begins. \n The fight, the silence, the pain — They were chapters, 
not the whole book. Now it's your turn. Your dreams. \n Your flight. Your city. Your shelter. Your teddies. Your home. \n No one to wait for. No one to explain to. Just you — And everything you ever imagined."` },
{ id: 22, image: img22, chapter: "Chapter Twenty-Two", title: "Delhi To Bangalore.", act: "act5", mood: "hope",
shayari: `I know that one day you. From Delhi's dust to Bangalore's rain,\n A girl with a suitcase and a heart with full of dreams.\nShe'll left behind the streets that knew her cry,\nTo find the version of herself that wouldn't die.` },
{ id: 23, image: img23, chapter: "Chapter Twenty-Three", title: "The Flight, You're first Love.", act: "act5", mood: "hope",
shayari: `Above the clouds, she'll watched the world shrink small,\nEvery chapter, every fight — suddenly so small.\nShe pressed her forehead to the window pane,\nAnd whispered, "I'm not who I was — not again."` },
// { id: 24, image: img24, chapter: "Chapter Twenty-Four", title: "A New Sky", act: "act5", mood: "hope",
// shayari: `Bangalore greeted her with a different light,\nWarm and soft, and strangely bright.\nShe stepped out of the airport, took a breath,\nAnd felt something inside her come back from death.` },
// { id: 25, image: img25, chapter: "Chapter Twenty-Five", title: "Her First Job Interview", act: "act5", mood: "hope",
// shayari: `A crisp white shirt, a nervous smile,\nA resume she'd rewritten a hundred times, mile by mile.\nShe walked into the room like she owned the place,\nAnd the world saw the girl behind the face.` },
{ id: 26, image: img26, chapter: "Chapter Twenty-Six", title: "You're first Job in Banglore.", act: "act5", mood: "hope",
shayari: `The email came at 11:47 pm,\n"We're happy to inform you" — and she cried in the dark.\nNot from sadness — but from something new,\nA girl who once felt nothing, finally knew.` },
{ id: 27, image: img27, chapter: "Chapter Twenty-Seven", title: "Working Her Dream Job.", act: "act5", mood: "hope",
shayari: `Mornings with coffee, evenings with code,\nColleagues who became friends, and a life that glowed.\nShe built things with her hands and her mind,\nAnd slowly, she left the old her behind.` },
// { id: 28, image: img28, chapter: "Chapter Twenty-Eight", title: "She Was Good At It", act: "act5", mood: "hope",
// shayari: `They praised her work, they said her name,\nAnd for once, it didn't feel like a game.\nShe was good — not because someone told her so,\nBut because she finally believed it, slow and slow.` },
{ id: 29, image: img29, chapter: "Chapter Twenty-Nine", title: "The House She Dreamt Of.", act: "act5", mood: "hope",
shayari: `One day she'll build a house with big windows and \n warm light, Plants on the sill, books by her side at night.\nShe painted the walls the colour of her soul,\nAnd for the first time she felt she achieved everthing \n once she dreamt of.` },
{ id: 30, image: img30, chapter: "Chapter Thirty", title: "Your Dream: A Shelter for Animal's.", act: "act5", mood: "hope",
shayari: `One day she will build a home for animals, \n Where they will live and love each other.
A place where love begins, Where she cares for them \n  — forever.` },
{ id: 31, image: img31, chapter: "Chapter Thirty-One", title: "She Cared For Them", act: "act5", mood: "hope",
shayari: `Every morning you'll feed them with your own hands,\n will Give names to the ones who'd been abandoned by lands.\nyou'll give them water, medicine, and love,\nAnd they'll give you back a peace from above.` },
// { id: 32, image: img32, chapter: "Chapter Thirty-Two", title: "They Loved Her Back", act: "act5", mood: "hope",
// shayari: `The dogs would run to her when she came,\nThe cats would curl up and whisper her name.\nShe realised then — love doesn't need words,\nIt just needs someone who truly cares.` },
{ id: 33, image: img33, chapter: "Chapter Thirty-Three", title: "A World: for Animal's.", act: "act5", mood: "hope",
shayari: `Word spread, people came, help arrived,\nAnd the little shelter she built — thrived.\nShe wasn't just a girl anymore, she was a home,\nFor every soul that had ever felt alone.` },
{ id: 34, image: img34, chapter: "Chapter Thirty-Four", title: "Her Teddy Collection — After All Her Dream's.", act: "act5", mood: "hope",
shayari: `On her bed sat teddies — soft, old, and new,\nEach one a memory she'd held onto.\nFrom childhood to now, they'd watched her grow,\nAnd they knew every secret she'd never let show.` },
{ id: 35, image: img35, chapter: "The Final Page", title: "She Achieved Everything She Dreamt Of.", act: "act5", mood: "hope",
shayari: `She lay on her dari, the diary in her hand,\nLooking back at the girl who once couldn't stand.\nThe flight, the job, the house, the care,\nThe teddies, the shelter — they were all still there.\n\nShe smiled at the ceiling, a tear in her eye,\n"I did everything I ever imagined," she sighed.\nNot for anyone else — but for the girl she used to be,\nWho once thought she'd never be free.` },
];

const lastChapter = {
id: 36,
image: img35,
chapter: "Epilogue",
title: "A Letter To The Girl I Was",
shayari: `Dear girl who cried alone at night,\nWho thought her dreams were out of sight,\nLook at us now — we made it through,\nEvery single thing I promised you.\n\nThe flight, the job, the house, the care,\nThe teddies, the shelter — they're all still there.\nAnd the boy who left, the friend who broke,\nThey were just chapters — not the whole book.\n\nSo here I am, on my dari, at peace,\nWith everything I ever wanted, finally at ease.\nI did it, love. I did it all.\nAnd I'm so proud of you for not letting me fall.`,
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

function Scene({ item, onMood }) {
const ref = useRef(null);
const [inView, setInView] = useState(false);
useEffect(() => {
const el = ref.current;
if (!el) return;
const obs = new IntersectionObserver(([e]) => {
if (e.isIntersecting) { setInView(true); onMood(item.mood); }
}, { threshold: 0.2 });
obs.observe(el);
return () => obs.disconnect();
}, [item.mood, onMood]);
return (
<section ref={ref} className={`scene ${item.act} ${inView ? "in-view" : ""}`} id={`ch-${item.id}`}>
<div className="scene-top">
<span className="scene-num">SCENE {String(item.id).padStart(2, "0")} / 36</span>
<span className="scene-time">⏺ 00:{String(item.id).padStart(2, "0")}:00</span>
</div>
<div className="scene-body">
<div className="film-frame">
<div className="frame-photo">
{item.video ? (
<video
src={item.video}
autoPlay
loop
muted
playsInline
className="frame-video"
/>
) : (
<img src={item.image} alt={item.title} loading="lazy" />
)}
{item.id === 13 && <div className="crack" />}
<div className="grain" />
<div className="vignette" />
<div className="frame-shine" />
</div>
<div className="frame-caption"><span className="frame-icon">◉</span><span>{item.title}</span></div>
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
<span key={i} style={{
left: `${Math.random() * 100}%`,
animationDelay: `${Math.random() * 12}s`,
animationDuration: `${12 + Math.random() * 12}s`,
width: `${2 + Math.random() * 3}px`,
height: `${2 + Math.random() * 3}px`,
}} />
))}
</div>
<div className="letter-glow" />
<div className="letter-aurora" />
{!open ? (
<button className="chit" onClick={() => setOpen(true)}>
<span className="chit-fold line1" />
<span className="chit-fold line2" />
<span className="chit-wax"><span className="wax-inner">♥</span></span>
<span className="chit-text">A LETTER TO THE GIRL I WAS</span>
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
<p className="rewrite-line">I Did Everything I Imagined</p>
</div>
</div>
)}
</section>
);
}

function PromiseScene({ onMood }) {
const [called, setCalled] = useState(false);
const [visible, setVisible] = useState(false);
const ref = useRef(null);
useEffect(() => {
const el = ref.current;
if (!el) return;
const obs = new IntersectionObserver(([e]) => {
if (e.isIntersecting) { setVisible(true); onMood("stand"); }
}, { threshold: 0.25 });
obs.observe(el);
return () => obs.disconnect();
}, [onMood]);
return (
<section ref={ref} className={`promise-scene ${visible ? "in-view" : ""}`}>
<div className="promise-stars">
{Array.from({ length: 30 }).map((_, i) => (
<span key={i} className="star" style={{
left: `${Math.random() * 100}%`,
top: `${Math.random() * 100}%`,
animationDelay: `${Math.random() * 3}s`,
}} />
))}
</div>
<div className="promise-inner">
<p className="p-small">Bhumi,

I am really, really, really sorry.
A million times sorry.

Once, you cared for me
more than I deserved.
Let me care for you once again —
more and more, for infinite times.
A million times sorry.

You don't need to love me.
You don't need to feel anything like that.
Do what you want. Be blessed a thousand times.
Find the one you want.

No hope from you anymore.
Not wanting anything from you.

But please, please, please —
don't end the things like this.
The things we built in four months.

It didn't take me three weeks to ignore you.
It took me three weeks to understand myself,
to undo the feelings I had for you.

Finally, I am that Jay
you met four months ago.

Let's be that again —
that Bhumi or Jay.

Please. Please. Please.</p>

<div className="promise-quote-box">
<p className="p-quote">
"Whenever you're in problem
or feel too down…<br />
come to me.<br />
I'm here to take that promise from you."
</p>
</div>
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

function Ending() {
return (
<section className="ending">
<div className="ending-glow" />
<p className="end-line">I did everything I imagined.</p>
<div className="end-options">
<p className="end-sub">— the girl who once cried alone?</p>
<span className="end-or">became</span>
<p className="end-sub end-sub-highlight">— the woman who built her own world.</p>
</div>
<div className="end-credit">
<span className="credit-line" />
<p>THE LAST SHOW · PART 2</p>
<span className="credit-line" />
</div>
</section>
);
}

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
else { clearInterval(t); setIntro(false); setSongOn(true); }
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
<h1 className="app-title">You Can Still Rewrite This</h1>
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