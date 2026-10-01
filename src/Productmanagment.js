import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import AddProducts from "./AddProducts";
import Deleteproduct from "./Deleteproduct";
import "./Productmanagment.css";

function Productmanagment() {

const navigate = useNavigate();

const [Product_relativeCon, setProduct_relativeCon] = useState(false);
const [dashboard_containerCon, setdashboard_containerCon] = useState(false);
const [Delete_relativeCon, setDelete_relativeCon] = useState(false);
const [Delete_formCon, setDelete_formCon] = useState(false);

useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (!isLoggedIn) {
navigate("/adminlogin");
}
}, [navigate]);

return (
<div style={{ padding: "20px" }}>

<div 
className="admin-profile-link" 
onClick={() => navigate("/adminprofile")}
>
<img className="icon"
src="https://cdn-icons-png.flaticon.com/128/4829/4829575.png"></img>
<h1>Profile</h1>
</div>

<AddProducts
Product_relativeCon={Product_relativeCon}
dashboard_containerCon={dashboard_containerCon}
/>

<Deleteproduct
Delete_relativeCon={Delete_relativeCon}
Delete_formCon={Delete_formCon}
/>
</div>
);
}

export default Productmanagment;