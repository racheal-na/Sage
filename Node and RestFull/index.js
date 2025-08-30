const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 2017;

app.use(cors());
app.use(express.json());

let laptops = [
  { id: 1, brand: "Dell", model: "XPS 13", price: 1200 },
  { id: 2, brand: "Apple", model: "MacBook Air", price: 1400 },
  { id: 3, brand: "HP", model: "Spectre x360", price: 1100 }
];


app.get("/laptops", (req, res) => {
  res.json(laptops);
});


app.post("/laptops/create", (req, res) => {
  const { brand, model, price } = req.body;
  const newLaptop = {
    id: laptops.length ? laptops[laptops.length - 1].id + 1 : 1,
    brand,
    model,
    price: Number(price),
  };
  laptops.push(newLaptop);
  res.status(201).json(newLaptop);
});

app.put("/laptops/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = laptops.findIndex(l => l.id === id);
  if (index !== -1) {
    laptops[index] = {
      ...laptops[index],
      brand: req.body.brand || laptops[index].brand,
      model: req.body.model || laptops[index].model,
      price: req.body.price ? Number(req.body.price) : laptops[index].price,
    };
    res.json(laptops[index]);
  } else {
    res.status(404).json({ message: "Laptop not found!" });
  }
});

app.delete("/laptops/:id", (req, res) => {

  const id = parseInt(req.params.id);
  laptops = laptops.filter(l => l.id !== id);
  res.json({ message: "Laptop deleted successfully" });

});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
