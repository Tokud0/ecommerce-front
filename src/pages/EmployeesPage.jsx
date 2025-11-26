import { useEffect, useState } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editForm, setEditForm] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api.getEmployees();
      setEmployees(data);
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
      await api.createEmployee(form);
      setForm({ name: "", email: "", role: "" });
      setSuccess("Employee successfully added!");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(emp) {
    setEditForm({ ...emp });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await api.updateEmployee(editForm._id, {
        name: editForm.name,
        email: editForm.email,
        role: editForm.role
      });
      setEditForm(null);
      setSuccess("Employee updated successfully!");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure?")) return;

    try {
      await api.deleteEmployee(id);
      setSuccess("Employee deleted.");
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
      <h2 style={{ marginBottom: "15px" }}>Employees</h2>

      <Alert type="success" message={success} onClose={() => setSuccess("")} />
      <Alert type="error" message={error} onClose={() => setError("")} />

      {/* CREATE FORM */}
      <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
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
          required
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <select
          style={inputStyle}
          required
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>

        <button style={buttonStyle}>Add Employee</button>
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
          <h3>Edit Employee</h3>

          <input
            style={inputStyle}
            value={editForm.name}
            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
          />

          <input
            style={inputStyle}
            type="email"
            value={editForm.email}
            onChange={e => setEditForm({ ...editForm, email: e.target.value })}
          />

          <select
            style={inputStyle}
            value={editForm.role}
            onChange={e => setEditForm({ ...editForm, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>

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
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Role</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.email}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.role}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => startEdit(emp)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#ffc107",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(emp._id)}
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

export default EmployeesPage;
