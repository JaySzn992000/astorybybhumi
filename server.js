const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const Razorpay = require("razorpay");
const cloudinary = require("cloudinary").v2;
const app = express(); 

require("dotenv").config();
const pool = require("./config");

app.use(cors({
origin: [
'https://shayariforyou-puce.vercel.app',
'http://localhost:3000' // 👈 Local testing ke liye add kiya hai
],
methods: ['GET', 'POST', 'PUT', 'DELETE'],
credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
const PORT = 3001;

const db = mysql.createConnection({
host: "localhost",
database: "ecomweb1",
user: "root",
password: "jay992000",
});

app.get("/", async (req, res) => {
res.send("✅ Backend is Live & Working");
});

app.get("/ping", (req, res) => {
res.status(200).send("Server is alive!");
});

const axios = require("axios");

// ==========================================
// VISIT COUNTER API
// ==========================================
app.get('/api/visits', (req, res) => {
const filePath = path.join(__dirname, 'visits.json');

let count = 0;
// Agar file pehle se hai, toh count uthao
if (fs.existsSync(filePath)) {
try {
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
count = data.count || 0;
} catch (e) {
count = 0;
}
}

// Count 1 badhao
count += 1;

// Wapas file mein save karo
fs.writeFileSync(filePath, JSON.stringify({ count }), 'utf8');

// Frontend ko bhej do
res.json({ count: count });
});


app.get("/registeration", async (req, res) => {
try {
const result = await pool.query("SELECT * FROM public._registeration");
res.json(result.rows);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


app.get("/api/test", async (req, res) => {
try {
const result = await pool.query("SELECT NOW()");
res.json(result.rows[0]);
} catch (err) {
console.error("❌ DB Error:", err.message);
res.status(500).send("Database error");
}
});


app.post("/registerationPost", async (req, res) => {
const { name, email, password, mobileno } = req.body;

try {
// Step 1: Check for duplicate mobile
const checkMobileQuery = `
SELECT mobileno FROM _registeration WHERE mobileno = $1 LIMIT 1
`;
const mobileResult = await pool.query(checkMobileQuery, [mobileno]);

if (mobileResult.rows.length > 0) {
return res.status(200).json({
success: false,
message: "Mobile number already registered",
});
}

// Step 2: Check for duplicate email
const checkEmailQuery = `
SELECT email FROM _registeration WHERE email = $1 LIMIT 1
`;
const emailResult = await pool.query(checkEmailQuery, [email]);

if (emailResult.rows.length > 0) {
return res.status(200).json({
success: false,
message: "Email address already registered",
});
}

// Step 3: Insert new user
const insertQuery = `
INSERT INTO _registeration (name, email, password, mobileno)
VALUES ($1, $2, $3, $4)
`;
await pool.query(insertQuery, [name, email, password, mobileno]);

return res.status(200).json({
success: true,
message: "Registered successfully",
});

} catch (err) {
console.error("❌ Registration error:", err.message);
return res.status(500).json({
success: false,
message: "System error. Please try later.",
});
}
});


app.use(express.static(path.join(__dirname, "public")));

app.get("/fetchProductslist", async (req, res) => {
const searchQuery = req.query.search || "";
const keywords = searchQuery.toLowerCase().split(/\s+/);

try {
const conditions = keywords.map((_, index) => `LOWER(name) ILIKE $${index + 1}`).join(" AND ");
const values = keywords.map((keyword) => `%${keyword}%`);

const query = `
SELECT * FROM _imgproduct
WHERE ${conditions}
`;

const result = await pool.query(query, values);

if (result.rows.length > 0) {
return res.json(result.rows);
}

const exactMatchQuery = `
SELECT * FROM _imgproduct
WHERE LOWER(img) = LOWER($1)
`;
const exactResult = await pool.query(exactMatchQuery, [searchQuery]);

res.json(exactResult.rows);
} catch (err) {
console.error("❌ Database query failed:", err.message);
res.status(500).json({ error: "Database query failed" });
}
});

app.get("/fetchProductslist", (req, res) => {
db.query("SELECT * FROM imgproduct", (err, results) => {
if (err) {
console.error("Error fetching data:", err.stack);
return res.status(500).json({ error: "Database query failed" });
}
res.json(results);
});
});

app.get("/fetchProductslist", async (req, res) => {
try {
const result = await pool.query("SELECT * FROM _imgproduct");
res.json(result.rows);
} catch (err) {
console.error("Error fetching data:", err.message);
res.status(500).json({ error: "Database query failed" });
}
});


app.post("/fetchlogin", async (req, res) => {
const fetchQuery = "SELECT * FROM _registeration";

try {
const result = await pool.query(fetchQuery);
console.log(result.rows);
res.status(200).json(result.rows);
} catch (err) {
console.error("Error fetched:", err.message);
res.status(500).json({ message: "Error fetched", error: err.message });
}
});


app.post("/verifyemail", async (req, res) => {
const { email } = req.body;

if (!email) {
return res.status(400).json({ message: "Email is required" });
}

const checkEmailQuery = "SELECT * FROM _registeration WHERE email = $1";

try {
const result = await pool.query(checkEmailQuery, [email]);

if (result.rows.length === 0) {
return res.status(404).json({ message: "Email not found" });
}

return res.status(200).json({ message: "Email verified" });
} catch (err) {
console.error("Error fetching email:", err.message);
return res
.status(500)
.json({ message: "Error fetching email", error: err.message });
}
});


app.post("/resetpassword", async (req, res) => {
const { email, newPassword } = req.body;

if (!email || !newPassword) {
return res.status(400).json({ message: "Missing fields" });
}

try {
const checkUser = await pool.query(
"SELECT * FROM _registeration WHERE email = $1",
[email]
);

if (checkUser.rows.length === 0) {
return res.status(404).json({ message: "User not found" });
}

await pool.query(
"UPDATE _registeration SET password = $1 WHERE email = $2",
[newPassword, email]
);

return res.json({ message: "Password updated successfully" });

} catch (err) {
console.error("RESET ERROR:", err.message);
return res.status(500).json({ message: "Server error" });
}
});


app.post("/dletprdct", async (req, res) => {
const { price } = req.body;

if (!price) {
return res.status(400).json({ message: "Price is required" });
}

const deleteQuery = "DELETE FROM _ecart WHERE price = $1";

try {
const result = await pool.query(deleteQuery, [price]);

res.status(200).json({
message: "Product deleted successfully",
affectedRows: result.rowCount,
});
} catch (err) {
console.error("Error deleting product:", err.message);
res.status(500).json({ message: "Database error", error: err.message });
}
});


app.post("/addtocart", async (req, res) => {
const { userId, userName, userMobile, userEmail, cart } = req.body;

if (!cart || cart.length === 0) {
return res.status(400).json({ message: "Cart is empty" });
}

const values = cart.map((item) => [
userId,
item.price,
item.name,
item.img,
item.quantity,
userName,
userMobile,
userEmail,
]);

const insertQuery = `
INSERT INTO _carts (
user_id, price, name, img, quantity, user_name, user_mobile, user_email
) VALUES 
${values.map((_, i) => `($${i * 8 + 1}, $${i * 8 + 2}, $${i * 8 + 3}, $${i * 8 + 4}, $${i * 8 + 5}, $${i * 8 + 6}, $${i * 8 + 7}, $${i * 8 + 8})`).join(", ")}
`;

const flatValues = values.flat();

try {
const result = await pool.query(insertQuery, flatValues);
console.log("Items added to cart");
res.status(200).json({ message: "Items added to cart", rowCount: result.rowCount });
} catch (err) {
console.error("Error adding items to cart:", err.message);
res.status(500).json({ message: "Error adding items to cart", error: err.message });
}
});


app.post("/resetAdminPassword", async (req, res) => {
const { adminuser, newPassword } = req.body;

if (!adminuser || !newPassword) {
return res.status(400).json({ message: "Missing fields" });
}

try {
const checkUser = await pool.query(
"SELECT * FROM _admindashboard WHERE adminuser = $1",
[adminuser]
);

if (checkUser.rows.length === 0) {
return res.status(404).json({ message: "User not found" });
}

await pool.query(
"UPDATE _admindashboard SET adminpass = $1 WHERE adminuser = $2",
[newPassword, adminuser]
);

res.json({ message: "Password updated successfully" });
} catch (err) {
res.status(500).json({ message: "Error updating password", error: err.message });
}
});


app.post("/updateAdminSimple", async (req, res) => {
const { olduser, adminuser, adminpass } = req.body;

if (!olduser || !adminuser || !adminpass) {
return res
.status(400)
.json({ success: false, message: "All fields are required." });
}

const updateQuery = `
UPDATE _admindashboard
SET adminuser = $1, adminpass = $2
WHERE adminuser = $3
`;

try {
const result = await pool.query(updateQuery, [adminuser, adminpass, olduser]);

if (result.rowCount === 0) {
return res
.status(404)
.json({ success: false, message: "Admin not found." });
}

return res
.status(200)
.json({ success: true, message: "Admin updated successfully." });
} catch (err) {
console.error("Update error:", err.message);
return res
.status(500)
.json({
success: false,
message: "Server error while updating admin.",
error: err.message,
});
}
});


app.post("/fetchAdmin", async (req, res) => {
const { adminuser, adminpass } = req.body;

const loginQuery = `
SELECT * FROM _admindashboard
WHERE adminuser = $1 AND adminpass = $2
`;

try {
const result = await pool.query(loginQuery, [adminuser, adminpass]);

if (result.rows.length > 0) {
console.log("Login successful");
return res.status(200).json({ success: true, message: "Login successful" });
} else {
console.log("Invalid credentials");
return res.status(401).json({ success: false, message: "Invalid credentials" });
}
} catch (err) {
console.error("Error fetching user:", err.message);
return res.status(500).json({
success: false,
message: "Error fetching data",
error: err.message,
});
}
});


app.post('/registerAdmin', async (req, res) => {
const { adminuser, adminpass } = req.body;
console.log("Received admin register:", adminuser, adminpass);

try {
const insertAdminQuery = `
INSERT INTO _admindashboard (adminuser, adminpass)
VALUES ($1, $2)
`;
await pool.query(insertAdminQuery, [adminuser, adminpass]); 

return res.status(200).json({
success: true,
message: "Admin registered successfully"
});
} catch (err) {
console.error("Error in /registerAdmin:", err);
return res.status(500).json({
success: false,
message: "Server error while registering admin"
});
}
});


app.post("/updateform", async (req, res) => {
const { name, email, password, mobileno, id } = req.body;

if (!name || !email || !password || !mobileno || !id) {
return res.status(400).json({ message: "All fields are required" });
}

const updateQuery = `
UPDATE _registeration
SET name = $1, email = $2, password = $3, mobileno = $4
WHERE id = $5
`;

try {
await pool.query(updateQuery, [name, email, password, mobileno, id]);
console.log("Updated Successfully");
res.status(200).json({ message: "Updated Successfully" });
} catch (err) {
console.error("Database update error:", err.message);
res.status(500).json({ message: "Database update error", error: err.message });
}
});


app.listen(PORT, () => {
console.log(`Server is running PORT on ${PORT}`);
});


setInterval(() => {
axios
.get("https://shayariforyou.onrender.com/ping")
.then(() => {
console.log("Pinged self to stay awake");
})
.catch((err) => {
console.error("Ping failed", err.message);
});
}, 10 * 60 * 1000); 



// Razorpay Configuration

const razorpayInstance = new Razorpay({
key_id: "rzp_live_Zm7uF61IDcY0t9",
key_secret: "FgZimfWqOEOLs4ejcIZHO7yc",
});

app.post("/create-order", async (req, res) => {
const { amount } = req.body;

if (!amount || amount <= 0) {
return res.status(400).json({ error: "Invalid amount" });
}

const options = {
amount: amount * 100,
currency: "INR",
receipt: `receipt#${Date.now()}`,
payment_capture: 1,
};

try {
const order = await razorpayInstance.orders.create(options);
res.json(order);
} catch (err) {
console.error("Error creating Razorpay order:", err);
res.status(500).json({ error: "Failed to create order" });
}
});


app.post("/verify-payment", (req, res) => {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
req.body;

const crypto = require("crypto");
const hmac = crypto.createHmac("sha256", razorpayInstance.key_secret);

hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
const generated_signature = hmac.digest("hex");

if (generated_signature === razorpay_signature) {
res.json({ success: true });
} else {
res.status(400).json({ error: "Payment verification failed" });
}
});


// Cloudinary Configuration

cloudinary.config({
cloud_name: "dwwmpm9qy",
api_key: "428986251698984",
api_secret: "RWf2H7aeMTAEL2pTguwLKIS-110",
});

const upload = multer({ dest: "uploads/" });

const uploadToCloudinary = async (file) => {
if (!file) return null;
const result = await cloudinary.uploader.upload(file.path, {
folder: "products",
});
fs.unlinkSync(file.path);
return result.secure_url;
};

app.post(
"/api/add-product",
upload.fields([
{ name: "image", maxCount: 1 },
{ name: "imageone", maxCount: 1 },
{ name: "imagetwo", maxCount: 1 },
{ name: "imagethree", maxCount: 1 },
]),
async (req, res) => {
try {
console.log("📩 Body Data:", req.body);
console.log("📸 Files Data:", req.files);

const { category, name, price, sizes, stock, description, review } =
req.body;

const imagePath = await uploadToCloudinary(req.files.image?.[0]);
const imagePathOne = await uploadToCloudinary(req.files.imageone?.[0]);
const imagePathTwo = await uploadToCloudinary(req.files.imagetwo?.[0]);
const imagePathThree = await uploadToCloudinary(req.files.imagethree?.[0]);

const query = `
INSERT INTO _imgproduct 
(img, name, price, file_path, sizes, file_path1, file_path2, file_path3, stock, description, review) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
RETURNING id;
`;

const values = [
category,
name,
price,
imagePath,
sizes,
imagePathOne,
imagePathTwo,
imagePathThree,
stock,
description,
review,
];

const result = await pool.query(query, values);

res.status(200).json({
message: "✅ Product added successfully",
productId: result.rows[0].id,
});
} catch (err) {
console.error("❌ Upload failed:", err);
res.status(500).send("Upload failed");
}
}
);

app.post("/api/update-product", upload.single("image"), async (req, res) => {
const { oldName, newName, price } = req.body;
const imagePath = req.file ? `/Images/${req.file.filename}` : null;

try {
let query = "UPDATE _imgproduct SET name = $1, price = $2";
let queryParams = [newName, price];
let paramIndex = 3;

if (imagePath) {
query += `, file_path = $${paramIndex}`;
queryParams.push(imagePath);
paramIndex++;
}

query += ` WHERE name = $${paramIndex}`;
queryParams.push(oldName);

await pool.query(query, queryParams);
res.status(200).send("Product updated successfully");
} catch (err) {
console.error("Error updating product in database:", err.message);
res.status(500).send("Error updating product");
}
});


app.post("/deletebyname", async (req, res) => {
const { name } = req.body;

const deleteQuery = "DELETE FROM _imgproduct WHERE name = $1";

try {
const result = await pool.query(deleteQuery, [name]);

if (result.rowCount > 0) {
res.status(200).json({ message: "Product deleted successfully!" });
} else {
res.status(404).json({ error: "Product not found." });
}
} catch (err) {
console.error("Error deleting product:", err.message);
res.status(500).json({ error: "Failed to delete product." });
}
});


app.get("/amdinprofile", (req, res) => {
const productQuery = "SELECT * FROM _admindashboard";

db.query(productQuery, (err, result) => {
if (err) {
console.log("Fetch error");
res.status(500).json({ message: "Fetch error", error: err.message });
} else {
const totalProducts = result.length;
res.status(200).json({ products: result, total: totalProducts });
}
});
});