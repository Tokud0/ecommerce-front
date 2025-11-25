import { useEffect, useState } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";

function CreateOrderPage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getCustomers(), api.getProducts()])
      .then(([cust, prod]) => {
        setCustomers(cust);
        setProducts(prod);
      })
      .catch(err => setError(err.message));
  }, []);

  function addItem() {
    if (!selectedProductId) {
      setError("Please select a product.");
      return;
    }
    if (quantity <= 0) {
      setError("Quantity must be at least 1.");
      return;
    }

    setItems([...items, { productId: selectedProductId, quantity }]);
    setSelectedProductId("");
    setQuantity(1);
  }

  async function createOrder(e) {
    e.preventDefault();

    try {
      const order = await api.createOrder({ customerId, items });
      setSuccess(`Order created successfully! Total: $${order.total}`);
      setItems([]);
    } catch (err) {
      setError(err.message);
    }
  }

  const selectStyle = {
    padding: "8px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "8px 14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Create Order</h2>

      <Alert type="success" message={success} onClose={() => setSuccess("")} />
      <Alert type="error" message={error} onClose={() => setError("")} />

      <form onSubmit={createOrder}>
        <label style={{ marginRight: "10px" }}>Customer:</label>

        <select
          style={selectStyle}
          required
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.email})
            </option>
          ))}
        </select>

        <div style={{ marginTop: "25px" }}>
          <h3>Add Item</h3>

          <select
            style={selectStyle}
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} - ${p.price}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            style={{ ...selectStyle, width: "80px" }}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button
            type="button"
            style={{ ...buttonStyle, marginLeft: "10px" }}
            onClick={addItem}
          >
            Add
          </button>
        </div>

        <h3 style={{ marginTop: "25px" }}>Items</h3>
        <ul>
          {items.map((it, idx) => {
            const product = products.find((p) => p._id === it.productId);
            return (
              <li key={idx} style={{ marginBottom: "5px" }}>
                {product?.name} × {it.quantity}
              </li>
            );
          })}
        </ul>

        <button type="submit" style={{ ...buttonStyle, marginTop: "20px" }}>
          Create Order
        </button>
      </form>
    </div>
  );
}

export default CreateOrderPage;
