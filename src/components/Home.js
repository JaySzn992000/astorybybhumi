import { useState } from "react";
import { useNavigate } from "react-router";
import "./Home.css";
import Allproducts from "./allproducts";
import FlowerAnimation from "./FlowerAnimation";
import AnimationManager from "./AnimationManager";


const Home = () => {

const [showFilters, setShowFilters] = useState(false);

return (

<div>

<AnimationManager></AnimationManager>

</div>

);

};

export default Home;
