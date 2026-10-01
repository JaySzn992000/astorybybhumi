import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import "./ProductListmodule.css";
import { useNavigate } from "react-router";

const BookPage = React.forwardRef(({ children, className, onClick }, ref) => {

return (

<div className={`demoPage ${className || ""}`} ref={ref} onClick={onClick}>
{children}
</div>
);
});

const Allproducts = () => {
const [products, setProducts] = useState([]);
const [currentSong, setCurrentSong] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);
const audioRef = useRef(null);
const flipBookRef = useRef(null);

const songs = [
{ name: "Passenger Seat", artist: "R & B X Cover", file: "songfour.mp3", duration: "2:45" },
{ name: "Unwell", artist: "Matchbox Twenty", file: "song.mp3", duration: "3:54" },
{ name: "Sherpaa Roy", artist: "Classical Folk", file: "songtwo.mp3", duration: "4:12" },
{ name: "Late Night PH", artist: "Lo-Fi Beats", file: "songthree.mp3", duration: "2:45" },
];

useEffect(() => {
axios
.get("https://shayariforyou.onrender.com/fetchProductslist")
.then((res) => {
setProducts(res.data);
})
.catch((err) => {
console.log(err);
});
}, []);

const playSong = (song) => {
if (currentSong?.name === song.name && isPlaying) {
audioRef.current.pause();
setIsPlaying(false);
} else {
setCurrentSong(song);
setIsPlaying(true);
if (audioRef.current) {
audioRef.current.src = song.file;
audioRef.current.play().catch((err) => console.log("Playback engine delayed:", err));
}
}
};

const goNext = () => flipBookRef.current?.pageFlip()?.flipNext();
const goPrev = () => flipBookRef.current?.pageFlip()?.flipPrev();

const handleResetToCover = () => {
if (flipBookRef.current) {
flipBookRef.current.pageFlip().flip(0);
}
};

const navigate = useNavigate()
const handleaddstory = () => {
navigate('/productmanagment')
}

return (

<div className="flipbook_wrapper">

<audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

<button className="flip_prev" onClick={goPrev}>‹</button>
<button className="flip_next" onClick={goNext}>›</button>

<div className="book_container_layout">

{products.length > 0 && (
<HTMLFlipBook
width={490}
height={670}
size="stretch"
minWidth={300}
maxWidth={1000}
minHeight={400}
maxHeight={1533}
maxShadowOpacity={0.4}
showCover={true}
mobileScrollSupport={true}
className="flip-book"
ref={flipBookRef}
>

<BookPage className="hard_page">
<div className="front_book_cover">
<video 
className="cover_video_bg" 
src="/video.mp4" 
autoPlay 
loop 
muted 
playsInline />
<div className="cover_text">
<h1>The Untold Tales</h1>
<p>By Bhumi</p>
<p>Touch to Read</p>
</div>
</div>
</BookPage>

<BookPage className="hard_page">

<div className="left_song_page">

<div className={`premium_music_glow ${isPlaying ? "glow_active" : ""}`}></div>

<div className="premium_player_container">

<div className="vinyl_deck_wrapper">
<div className={`vinyl_disc ${isPlaying ? "vinyl_spinning" : ""}`}>
<div className="vinyl_center_label">
<div className="vinyl_center_hole"></div>
</div>
</div>
<div className={`tonearm_needle ${isPlaying ? "needle_on_deck" : ""}`}></div>
</div>

<header className="player_header">
<h2>Auditory Oasis</h2>
<p>Curated Soundtracks for Reading</p>
</header>

<div className="premium_playlist">
{songs.map((song, idx) => {
const isCurrent = currentSong?.name === song.name;
return (
<div 
key={idx} 
className={`premium_track_row ${isCurrent ? "track_active" : ""}`}
onClick={() => playSong(song)}
>
<div className="track_index">
{isCurrent && isPlaying ? (
<div className="playing_bars_wave">
<span></span><span></span><span></span>
</div>
) : (
String(idx + 1).padStart(2, '0')
)}
</div>

<div className="track_details">
<h3>{song.name}</h3>
<p>{song.artist}</p>
</div>

<div className="track_meta">
<span className="track_duration">{song.duration}</span>
<button className="premium_audio_trigger">
{isCurrent && isPlaying ? "⏸" : "▶"}
</button>
</div>
</div>
);
})}

{currentSong && (
<div className={`premium_now_playing_hud ${isPlaying ? "hud_visible" : ""}`}>
<div className="hud_wave_icon">🎵</div>
<div className="hud_text">
<span className="hud_label">NOW RESONATING</span>
<p className="hud_title">{currentSong.name} — {currentSong.artist}</p>
</div>
</div>
)}
</div>


</div>
</div>
</BookPage>

{products.map((product, index) => (
<BookPage key={`prod-${product.id || index}`}>
<div className="page_side page_front">
<div className="page_content">
<div className="product_card">
<img src={product.file_path} alt={product.name} />
<div className="product_info">
<p>{product.description}</p>
<p>{product.name}</p>
</div>
</div>
<div className="page_number">{index + 1}</div>
</div>
</div>
</BookPage>
))}

<BookPage 
className="hard_page reset_trigger_cover" 
key="book-back-cover" 
onClick={handleResetToCover}
>
<div className="back_book_cover">
<div className="back_cover_content">
<h2>Until the next Page</h2>
<div className="cover_insignia">✨</div>

<p
onClick={(e) => {
e.stopPropagation();
handleaddstory();
}}
>
Click to Add <br></br> Your Next Chapter
</p>

</div>
</div>
</BookPage>

</HTMLFlipBook>
)}

</div>
</div>
);
};

export default Allproducts;