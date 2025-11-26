import { useEffect, useState } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [editForm, setEditForm] = useState(null);

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

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await api.createProduct({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setForm({ name: "", price: "", stock: "" });
      setSuccess("Product successfully added!");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(product) {
    setEditForm({ ...product });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await api.updateProduct(editForm._id, {
        name: editForm.name,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      });

      setEditForm(null);
      setSuccess("Product updated successfully!");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.deleteProduct(id);
      setSuccess("Product deleted.");
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

      {/* CREATE FORM */}
      <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
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

      {/* EDIT FORM */}
      {editForm && (
        <form
          onSubmit={handleUpdate}
          style={{
            background: "#f7f7f7",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>Edit Product</h3>

          <input
            style={inputStyle}
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
          />

          <input
            style={inputStyle}
            type="number"
            value={editForm.price}
            onChange={(e) =>
              setEditForm({ ...editForm, price: e.target.value })
            }
          />

          <input
            style={inputStyle}
            type="number"
            value={editForm.stock}
            onChange={(e) =>
              setEditForm({ ...editForm, stock: e.target.value })
            }
          />

          <button style={{ ...buttonStyle, backgroundColor: "#28a745" }}>
            Update
          </button>

          <button
            type="button"
            style={{
              ...buttonStyle,
              backgroundColor: "#6c757d",
              marginLeft: "10px",
            }}
            onClick={() => setEditForm(null)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Stock</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {p.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                ${p.price}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {p.stock}
              </td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => startEdit(p)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#ffc107",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
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
