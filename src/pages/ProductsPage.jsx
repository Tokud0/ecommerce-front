import { useEffect, useState } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.createProduct({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setSuccess("Product successfully added!");
      setForm({ name: "", price: "", stock: "" });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.deleteProduct(id);
      setSuccess("Product successfully deleted.");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  const inputStyle = {
    padding: "8px",
    marginRight: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    padding: "8px 14px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  };

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Products</h2>

      <Alert type="success" message={success} onClose={() => setSuccess("")} />
      <Alert type="error" message={error} onClose={() => setError("")} />

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          style={inputStyle}
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={inputStyle}
          placeholder="Price"
          required
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          style={inputStyle}
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <button style={buttonStyle}>Add Product</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Stock</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{p.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>${p.price}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{p.stock}</td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => remove(p._id)}
                  style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
