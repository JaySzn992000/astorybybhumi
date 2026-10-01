import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import "./Adminlogin.css";

gsap.registerPlugin(Draggable, MorphSVGPlugin);

const Adminlogin = ({ setIsLoggedIn }) => {

const [formdata, setFormdata] = useState({
adminuser: "",
adminpass: "",
});

const [lampOn, setLampOn] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate();

const dummyCordRef = useRef(null);
const hitRef = useRef(null);
const proxyRef = useRef(document.createElement("div"));
const cord1Ref = useRef(null);
const cordsRef = useRef([]);

const registerhanlder = (e) => {

let { name, value } = e.target;

value = value.replace(/\s/g, "");

setFormdata((prev) => ({
...prev,
[name]: value,
}));

};

useEffect(() => {

const AUDIO = new Audio(
"https://assets.codepen.io/605876/click.mp3"
);

const ENDX = 124;
const ENDY = 348;

const RESET = () => {
gsap.set(proxyRef.current, {
x: ENDX,
y: ENDY,
});
};

RESET();

gsap.set([".cords", ".lamp__hit"], {
x: -10,
});

gsap.set(".lamp__eye", {
rotate: 180,
transformOrigin: "50% 50%",
yPercent: 50,
});

const CORD_TL = gsap.timeline({
paused: true,

onStart: () => {

setLampOn((prev) => {

const newState = !prev;

document.documentElement.style.setProperty(
"--on",
newState ? 1 : 0
);

const hue = gsap.utils.random(0, 359);

document.documentElement.style.setProperty(
"--shade-hue",
hue
);

document.documentElement.style.setProperty(
"--glow-color",
`hsl(${hue}, 40%, 45%)`
);

document.documentElement.style.setProperty(
"--glow-color-dark",
`hsl(${hue}, 40%, 35%)`
);

gsap.set(".lamp__eye", {
rotate: newState ? 0 : 180,
});

AUDIO.currentTime = 0;
AUDIO.play();

return newState;
});

gsap.set([dummyCordRef.current, hitRef.current], {
display: "none",
});

gsap.set(cord1Ref.current, {
display: "block",
});
},

onComplete: () => {

gsap.set([dummyCordRef.current, hitRef.current], {
display: "block",
});

gsap.set(cord1Ref.current, {
display: "none",
});

RESET();
},
});

for (let i = 1; i < cordsRef.current.length; i++) {

CORD_TL.add(
gsap.to(cord1Ref.current, {
morphSVG: cordsRef.current[i],
duration: 0.1,
repeat: 1,
yoyo: true,
})
);

}

let startX;
let startY;

Draggable.create(proxyRef.current, {
trigger: hitRef.current,
type: "x,y",

onPress: (e) => {
startX = e.x;
startY = e.y;
},

onDrag: function () {

gsap.set(dummyCordRef.current, {
attr: {
x2: this.x,
y2: Math.max(400, this.y),
},
});

},

onRelease: function (e) {

const DISTX = Math.abs(e.x - startX);
const DISTY = Math.abs(e.y - startY);

const TRAVELLED = Math.sqrt(
DISTX * DISTX + DISTY * DISTY
);

gsap.to(dummyCordRef.current, {
attr: {
x2: ENDX,
y2: ENDY,
},

duration: 0.1,

onComplete: () => {

if (TRAVELLED > 50) {
CORD_TL.restart();
} else {
RESET();
}

},
});

},
});

gsap.set(".lamp", {
display: "block",
});

}, []);

const submitAdmin = async (e) => {

e.preventDefault();

const { adminuser, adminpass } = formdata;

if (!adminuser.trim() || !adminpass.trim()) {
alert("All fields are required!");
return;
}

if (adminuser.trim().length < 3) {
alert("Username must be at least 3 characters.");
return;
}

if (adminpass.length < 6) {
alert("Password must be at least 6 characters.");
return;
}

try {

const response = await fetch(
"https://shayariforyou.onrender.com/fetchAdmin",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
adminuser: adminuser.trim(),
adminpass: adminpass.trim(),
}),
}
);

const data = await response.json();

if (data.success) {

setIsLoggedIn(true);

localStorage.setItem("isLoggedIn", "true");

localStorage.setItem(
"loggedInAdmin",
JSON.stringify(formdata)
);

navigate("/productmanagment");

} else {
alert(data.message || "Invalid username or password.");
}

} catch (error) {

console.error("Login error:", error);

alert("Server error. Please try again later.");

}

};

const createAccount = () => navigate("/AdminRegisteration");

const AdminForget = () => navigate("/AdminForget");

return (

<div className="admin-login-container">

<div className="container">

<div className={`pull-text ${lampOn ? "lampOn-hide" : ""}`}>
Hi' <br></br>
Bhumi, pull my rope<br />for the next chapter
</div>

<svg
className="lamp"
viewBox="0 0 333 484"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>

<g className="lamp__shade shade">

<ellipse
className="shade__opening"
cx="165"
cy="220"
rx="130"
ry="20"
/>

<ellipse
className="shade__opening-shade"
cx="165"
cy="220"
rx="130"
ry="20"
fill="url(#opening-shade)"
/>

</g>

<g className="lamp__base base">

<path
className="base__side"
d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z"
/>

<ellipse
className="base__top"
cx="165"
cy="430"
rx="80"
ry="20"
/>

</g>

<g className="lamp__post post">

<path
className="post__body"
d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z"
/>

</g>

<g className="lamp__cords cords">

<path
ref={cord1Ref}
className="cord cord--rig"
d="M124 187.033V347"
strokeWidth="6"
strokeLinecap="round"
/>

{[
"M124 187.023s17.007 21.921 17.007 34.846c0 12.925-11.338 23.231-17.007 34.846-5.669 11.615-17.007 21.921-17.007 34.846 0 12.925 17.007 34.846 17.007 34.846",

"M124 187.017s-21.259 17.932-21.259 30.26c0 12.327 14.173 20.173 21.259 30.26 7.086 10.086 21.259 17.933 21.259 30.26 0 12.327-21.259 30.26-21.259 30.26",

"M124 187s29.763 8.644 29.763 20.735-19.842 13.823-29.763 20.734c-9.921 6.912-29.763 8.644-29.763 20.735S124 269.939 124 269.939",

"M124 187.029s-10.63 26.199-10.63 39.992c0 13.794 7.087 26.661 10.63 39.992 3.543 13.331 10.63 26.198 10.63 39.992 0 13.793-10.63 39.992-10.63 39.992",
].map((path, i) => (

<path
key={i}
ref={(el) => (cordsRef.current[i + 1] = el)}
className="cord cord--rig"
d={path}
strokeWidth="6"
strokeLinecap="round"
/>

))}

<line
ref={dummyCordRef}
className="cord cord--dummy"
x1="124"
y1="190"
x2="124"
y2="348"
strokeWidth="6"
strokeLinecap="round"
/>

</g>

<path
className="lamp__light"
d="M290.5 193H39L0 463.5c0 11.046 75.478 20 165.5 20s167-11.954 167-23l-42-267.5z"
fill="url(#light)"
/>

<g className="lamp__top top">

<path
className="top__body"
fillRule="evenodd"
clipRule="evenodd"
d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z"
/>

</g>

<g className="lamp__face face">

<g className="lamp__mouth">
<path
d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z"
fill="#141414"
/>

<clipPath id="mouthClip">
<path
d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z"
/>
</clipPath>

<g clipPath="url(#mouthClip)">
<ellipse
className="lamp__tongue"
cx="187"
cy="175"
rx="21"
ry="13"
/>
</g>
</g>

<g className="lamp__eyes">

<path
className="lamp__eye lamp__stroke"
d="M115 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
strokeWidth="4"
strokeLinecap="round"
strokeLinejoin="round"
/>

<path
className="lamp__eye lamp__stroke"
d="M241 135c0-5.523-5.82-10-13-10s-13 4.477-13 10"
strokeWidth="4"
strokeLinecap="round"
strokeLinejoin="round"
/>

</g>

</g>

<circle
ref={hitRef}
className="lamp__hit"
cx="124"
cy="347"
r="66"
fill="#C4C4C4"
fillOpacity=".1"
/>

<defs>

<linearGradient
id="opening-shade"
x1="35"
y1="220"
x2="295"
y2="220"
gradientUnits="userSpaceOnUse"
>
<stop />

<stop
offset="1"
stopColor="var(--shade)"
stopOpacity="0"
/>

</linearGradient>

<linearGradient
id="light"
x1="165.5"
y1="218.5"
x2="165.5"
y2="483.5"
gradientUnits="userSpaceOnUse"
>

<stop
stopColor="var(--l-1)"
stopOpacity=".2"
/>

<stop
offset="1"
stopColor="var(--l-2)"
stopOpacity="0"
/>

</linearGradient>

</defs>

</svg>


<form
className={`admin-login-form ${
lampOn ? "show-form" : ""
}`}
onSubmit={submitAdmin}
>

<h3>Thank's You !</h3>

<p>
Enter your email address and password
to access
</p>

<div className="form-group">

<h4>Username</h4>

<input
required
placeholder="Username"
name="adminuser"
value={formdata.adminuser}
className="form-input"
onChange={registerhanlder}
/>

</div>

<div className="form-group">

<h4>Password</h4>

<div className="password-wrapper">

<input
required
placeholder="Password"
value={formdata.adminpass}
name="adminpass"
onChange={registerhanlder}
type={showPassword ? "text" : "password"}
className="form-input"
/>

<span
className="eye-icon"
onClick={() =>
setShowPassword(!showPassword)
}
>
{showPassword ? (
<FaEyeSlash />
) : (
<FaEye />
)}
</span>

</div>

</div>

<section>

{/* <h4 onClick={createAccount}>
Create Account
</h4> */}

{/* <h4 onClick={AdminForget}>
Forget Password
</h4> */}

</section>

<button type="submit" className="login-button">
Login
</button>

</form>

</div>

</div>

);
};

export default Adminlogin;