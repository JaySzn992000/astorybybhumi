import React, { useState, useEffect } from 'react';
import FlowerAnimation from './FlowerAnimation';
import Allproducts from './allproducts';

const AnimationManager = () => {

const [showBook, setShowBook] = useState(false);

useEffect(() => {
const timer = setTimeout(() => {
setShowBook(true); 
}, 5000); 

return () => clearTimeout(timer);
}, []);

return (

<div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#001424' }}>

<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
<FlowerAnimation />
</div>

{showBook && (
<div className="book-fade-in-wrapper">
<Allproducts />
</div>
)}

<style>

{`
.book-fade-in-wrapper {
position: absolute;
top: 50%;
left: 50%;
z-index: 50;
animation: fadeInUp 1.5s ease-out forwards;
}

@keyframes fadeInUp {
from {
opacity: 0;
transform: translate(-50%, -40%);
}
to {
opacity: 1;
transform: translate(-50%, -50%);
}
}
`}

</style>

</div>

);
};

export default AnimationManager;