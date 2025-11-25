import { useEffect, useState } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api.getCustomers();
      setCustomers(data);
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
      await api.createCustomer(form);
      setForm({ name: "", email: "", phone: "" });
      setSuccess("Customer successfully added!");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      await api.deleteCustomer(id);
      setSuccess("Customer successfully deleted.");
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
    borderRadius: "5px"
  };

  const buttonStyle = {
    padding: "8px 14px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
  };

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Customers</h2>

      <Alert type="success" message={success} onClose={() => setSuccess("")} />
      <Alert type="error" message={error} onClose={() => setError("")} />

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          style={inputStyle}
          placeholder="Name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={inputStyle}
          placeholder="Email"
          type="email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={inputStyle}
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <button style={buttonStyle}>Add Customer</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c => (
            <tr key={c._id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{c.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{c.email}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{c.phone}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => remove(c._id)}
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

export default CustomersPage;
