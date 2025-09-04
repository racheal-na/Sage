const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();


app.use(express.json());


mongoose.connect("mongodb+srv://legalease:lura1219@legalease-cluster.bqanect.mongodb.net/?retryWrites=true&w=majority&appName=LegalEase-cluster")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));


function auth(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, "naba", (err, decoded) => {
        if (err) return res.status(403).send("Unauthorized");
        req.user = decoded;
        next();
    });
}


function authRole(requiredRole) {
    return (req, res, next) => {
        if (!req.user.role || req.user.role !== requiredRole) {
            return res.status(403).send("Forbidden");
        }
        next();
    };
}


const ShoesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    Size: { type: Number, required: true },
    CustomerNumber: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    Collections: { type: String }
});

const ShoesModel = mongoose.model("Shoes", ShoesSchema);


app.post("/register", async (req, res) => {
    
        const { name, CustomerNumber, brand, Size, password, role, Collections } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const Shoes = new ShoesModel({name,CustomerNumber,brand,Size,
            password: hashedPassword,role: role || "user",Collections
        })

        await Shoes.save();
        res.status(201).json({ message: "Shoes registered" });

   
});


app.post("/login", async (req, res) => {

    const { CustomerNumber, password } = req.body;
    const Shoes = await ShoesModel.findOne({ CustomerNumber });
    if (!Shoes) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, Shoes.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect credentials" });
    delete Shoes.password;
    const token = jwt.sign(
        { id: Shoes.id, name: Shoes.name, CustomerNumber: Shoes.CustomerNumber, role: Shoes.role },
        "tsiony")
    return res.json({ name: Shoes.name, CustomerNumber: Shoes.CustomerNumber, role: Shoes.role, token })

})


app.get("/showCollections", auth, async (req, res) => {

    const Shoes = await ShoesModel.findById(req.user.id);
    res.send("welcome to the Collections " + Shoes.Collections + "<br/>>" + "your shoes collection is "
        + Shoes.brand)
})

app.get("/admin", auth, authRole("admin"), async (req, res) => {

    const users = await ShoesModel.find();
    res.json(users);

})


app.listen(2500, () => {
    console.log("Server started");
});
