/* ================= CHAT MEMORIES ================= */
function ChatMemories() {
const [visible, setVisible] = useState(false);
const ref = useRef(null);

useEffect(() => {
const el = ref.current;
if (!el) return;
const obs = new IntersectionObserver(
([e]) => e.isIntersecting && setVisible(true),
{ threshold: 0.15 }
);
obs.observe(el);
return () => obs.disconnect();
}, []);

const chats = [
{ img: chat1, name: "Chat 1" },
{ img: chat2, name: "Chat 2" },
{ img: chat3, name: "Chat 3" },
{ img: chat4, name: "Chat 4" },
{ img: chat5, name: "Chat 5" },
];

return (
<section ref={ref} className={`chat-memories ${visible ? "in-view" : ""}`}>
<div className="chat-memories-glow" />

<div className="chat-memories-inner">
<p className="chat-memories-label">Once you said me…</p>
<h2 className="chat-memories-title">Do You Remember These?</h2>

<div className="chat-grid">
{chats.map((chat, i) => (
<div className="chat-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
    <div className="chat-card-frame">
    <img src={chat.img} alt={chat.name} loading="lazy" />
    <div className="chat-card-grain" />
    </div>
    <p className="chat-card-name">{chat.name}</p>
</div>
))}
</div>

<p className="chat-memories-footer">
I still have all of these.
<br />
Every single one.
</p>
</div>
</section>
);
}