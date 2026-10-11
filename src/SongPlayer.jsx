import React, { useEffect, useRef, useState } from "react";
import song from "./Images/song.mpeg";

export default function SongPlayer({ startWhen }) {
const audioRef = useRef(null);
const [started, setStarted] = useState(false);

// Jab startWhen true ho — song play karo
useEffect(() => {
if (startWhen && audioRef.current && !started) {
audioRef.current.play()
.then(() => setStarted(true))
.catch(() => {});
}
}, [startWhen, started]);

// Agar autoplay block ho — first click pe chalao
useEffect(() => {
const startMusic = () => {
if (audioRef.current && !started) {
audioRef.current.play()
.then(() => setStarted(true))
.catch(() => {});
}
window.removeEventListener("click", startMusic);
};
window.addEventListener("click", startMusic);
return () => window.removeEventListener("click", startMusic);
}, [started]);

return (
<audio
ref={audioRef}
src={song}
loop
preload="auto"
/>
);
}