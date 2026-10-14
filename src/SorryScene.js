import React, { useState, useEffect, useRef } from "react";
import "./SorryScene.css";

export default function SorryScene() {
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

return (
<section ref={ref} className={`sorry-scene ${visible ? "in-view" : ""}`}>
<div className="sorry-inner">
<p className="sorry-label">The Last Hope...</p>

<h2 className="sorry-title">I Am Sorry, Bhumii...</h2>

<div className="sorry-divider">
<span />
<i>❦</i>
<span />
</div>

<p className="sorry-text">
Bhumi…

I'm really, really sorry.
A million times sorry.

I Know You've Lots Of Dreams.
Lot's Of Pure Heart Lot's Of Care

I'Know You Have a Long Journey In Life.
I Do Understand...

Once, you cared for me
more than I deserved.

I promise —
I won't hurt you again.
I won't ignore you.
I won't leave you wondering.

But please —
don't let this end.
Don't let us end.

We grew together.
We taught each other.
We gave each other everything
without asking for anything back.

We weren't lovers.
We were never "us."
We were just… us.

Two people who became
each other's safe place.

And that safe place
can't just disappear
because of one mistake.

I'm not asking for forever.

May be not Forever ,,, But May be Forever...

I'm just asking —
don't be a stranger.
Don't make me a stranger.

Let's be that again.

That Bhumi.
That Jay.

Please.

I just want someone —

Bhale hi hum roz baat na kare,
bhale hi hum kuch na bole.

But tum ho na saath mein —
tou bas, it feels like sukoon.

that's it nothing more than that.

</p>

<p className="sorry-name">From — Jay</p>
</div>
</section>
);
}