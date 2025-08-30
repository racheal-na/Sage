import React, { useState } from "react";

function App() {
  const [laptops, setLaptops] = useState([]);
  const [form, setForm] = useState({ brand: "", model: "", price: "" });
  const [editId, setEditId] = useState(null);

  
  const fetchLaptops = async () => {
    try {
      const res = await fetch("http://localhost:2017/laptops");
      if (!res.ok) throw new Error("Failed to fetch laptops");
      const data = await res.json();
      setLaptops(data);
    } catch (err) {
      console.error(err);
    }
  };

  
  const saveLaptop = async () => {
    if (!form.brand || !form.model || !form.price) {
      alert("Please fill all fields!");
      return;
    }

    if (editId) {
      
      await fetch(`http://localhost:2017/laptops/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: form.brand,
          model: form.model,
          price: Number(form.price),
        }),
      });
      setEditId(null);
      fetchLaptops()
    } else {
  
      await fetch("http://localhost:2017/laptops/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: form.brand,
          model: form.model,
          price: Number(form.price),
        }),
      });
    }

    setForm({ brand: "", model: "", price: "" });
     
  };

  
  const deleteLaptop = async (id) => {
    await fetch(`http://localhost:2017/laptops/${id}`, {
      method: "DELETE",
    });
    fetchLaptops()
  };


  const editLaptop = (laptop) => {
    setForm({ brand: laptop.brand, model: laptop.model, price: laptop.price });
    setEditId(laptop.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Laptop CRUD</h1>

      
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button style={{backgroundColor: 'orangered', color: 'white'}} onClick={saveLaptop}>
          {editId ? "Update Laptop" : "Add Laptop"}
        </button>
        <button style={{backgroundColor: 'blue', color: 'white'}} onClick={fetchLaptops}>Get Laptops</button>
      </div>

      
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {laptops.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.brand}</td>
              <td>{l.model}</td>
              <td>${Number(l.price).toLocaleString()}</td>
              <td>
                <button style={{backgroundColor: 'orangered', color: 'white'}} onClick={() => editLaptop(l)}>Edit</button>
                <button style={{backgroundColor: 'blue', color: 'white'}} onClick={() => deleteLaptop(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;



