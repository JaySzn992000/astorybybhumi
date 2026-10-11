import React, { useState, useEffect, useRef } from "react";
import "./PromiseScene.css";

export default function PromiseScene({ onMood }) {

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
{ threshold: 0.15 }
);
obs.observe(el);
return () => obs.disconnect();
}, [onMood]);

return (

<section ref={ref} className={`promise-scene ${visible ? "in-view" : ""}`}>

<div className="promise-stars">
{Array.from({ length: 40 }).map((_, i) => (
<span
key={i}
className="star"
style={{
left: `${Math.random() * 100}%`,
top: `${Math.random() * 100}%`,
animationDelay: `${Math.random() * 4}s`,
animationDuration: `${2 + Math.random() * 3}s`,
}}
/>
))}
</div>

<div className="promise-aurora" />
<div className="promise-glow" />

<div className="promise-inner">
<div className="promise-header">
<span className="promise-line" />
<span className="promise-badge">💌</span>
<span className="promise-line" />
</div>

<p className="p-small">A letter from Jay</p>
<h2 className="promise-title">Bhumi,</h2>

<div className="promise-letter">
<p className="p-body">
I am really, really, really sorry.
<br />
<span className="p-highlight">A million times sorry.</span>
</p>

<p className="p-body">
Once, you cared for me
<br />
more than I deserved.
<br />
Let me care for you once again —
<br />
more and more, for infinite times.
</p>

<p className="p-body p-italic">
You don't need to love me.
<br />
You don't need to feel anything like that.
<br />
Do what you want. Be blessed a thousand times.
<br />
Find the one you want.
</p>

<p className="p-body">
No hope from you anymore.
<br />
Not wanting anything from you.
</p>

<div className="p-divider">
<span />
<i>❦</i>
<span />
</div>

<p className="p-body p-emphasis">
But please, please, please —
<br />
don't end the things like this.
<br />
The things we built in four months.
</p>

<p className="p-body p-italic">
It didn't take me three weeks to ignore you.
<br />
It took me three weeks to understand myself,
<br />
to undo the feelings I had for you.
</p>

<p className="p-body p-strong">
Finally, I am that Jay
<br />
you met four months ago.
</p>

<p className="p-body p-soft">
Let's be that again —
<br />
that Bhumi or Jay.
</p>

<p className="p-final">Please. Please. Please.</p>
</div>

<div className="promise-quote-box">
<span className="quote-mark">"</span>
<p className="p-quote">
Whenever you're in problem
<br />
or feel too down…
<br />
come to me.
<br />
I'm here to take that promise from you.
</p>
<span className="quote-mark end">"</span>
</div>

{!called ? (
<button className="call-btn" onClick={() => setCalled(true)}>
<span className="call-icon">📞</span>
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
</div>
</section>
);
}