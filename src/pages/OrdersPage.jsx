import { useEffect, useState } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Orders</h2>

      <Alert type="error" message={error} onClose={() => setError("")} />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Customer</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Items</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{o.customer?.name}</td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <ul style={{ paddingLeft: "20px" }}>
                  {o.items.map((item) => (
                    <li key={item._id}>
                      {item.product?.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>${o.total}</td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {new Date(o.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
