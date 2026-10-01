import React, { useState } from "react";
import "./Deleteproduct.css";

function Delete({ Delete_relativeCon, Delete_formCon }) {

const [productName, setProductName] = useState("");
const [message, setMessage] = useState("");

const handleDelete = async (e) => {
e.preventDefault();

try {
const response = await fetch("https://shayariforyou.onrender.com/deletebyname", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ name: productName }),
});

const data = await response.json();

if (response.ok) {
setMessage(data.message || "Product deleted successfully!");
alert("Shayari deleted successfully!");
} else {
setMessage(data.error || "Failed to delete product.");
alert("Product deleted successfully!");
}
} catch (error) {
setMessage("An error occurred while deleting the product.");
}

setProductName("");
};


return (

<div>

<div
className={`Delete-relative ${
Delete_relativeCon ? "Delete_relativeConinside" : ""
}`} >

<div
className={`Delete_form ${
Delete_formCon ? "Delete_formConinside" : ""
}`} >

<form onSubmit={handleDelete}>

{/* <div className="Flx_IconPrct">
<img 
className="IconAddPrdctDlt"
src="https://cdn-icons-png.flaticon.com/128/6713/6713666.png"></img>
<h3 id="Addtag">Shayari</h3>
</div> */}

<label>Shayari</label>
<input
type="text"
placeholder="Shayari"
value={productName}
onChange={(e) => setProductName(e.target.value)} />
<br></br>
<button type="submit">Remove Shayari</button>
</form>

</div>
</div>

</div>

);

}

export default Delete;
