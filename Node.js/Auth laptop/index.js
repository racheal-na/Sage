const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://rahena_19:lura1219@cluster0.cvrfpne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: 'No Token' });

  jwt.verify(token, "sage", (err, decoded) => {
    if (err) return res.status(403).send("Unauthorized");
    console.log(decoded);
    req.user = decoded;
    next();
  });
}


const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  gender: { type: String },
  password: { type: String },
  price: { type: Number, default: 0 },
  role: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  gender: { type: String },
  password: { type: String },
  price: { type: Number, default: 0 }
});

const AdminModel = mongoose.model('admin', adminSchema);
const UserModel = mongoose.model('user', userSchema);


app.post('/admin/createAccount', async (req, res) => {
  try {
    const { name, phoneNumber, gender, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const admin = new AdminModel({ name, phoneNumber, gender, password: hashPassword, role });
    await admin.save();
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/admin/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const admin = await AdminModel.findOne({ phoneNumber });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect phone number or password' });

    const token = jwt.sign({ id: admin._id, name: admin.name, phoneNumber: admin.phoneNumber }, "sage", { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/user/createAccount', async (req, res) => {
  try {
    const { name, phoneNumber, gender, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new UserModel({ name, phoneNumber, gender, password: hashPassword });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/user/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await UserModel.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect phone number or password' });

    const token = jwt.sign({ id: user._id, name: user.name, phoneNumber: user.phoneNumber }, "sage", { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/admin", auth, async (req, res) => {
  res.send("Welcome admin " + req.user.name);
});

app.get('/showPrice', auth, async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  res.send(`Welcome user ${user.name} <br/> Your account price is: ${user.price}`);
});


app.listen(5800, () => {
  console.log("Server started on port 5800");
});
