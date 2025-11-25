import { Link } from "react-router-dom";

function Home() {
  const container = {
    textAlign: "center",
    paddingTop: "40px",
  };

  const titleStyle = {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#2c3e50",
  };

  const subtitleStyle = {
    fontSize: "18px",
    color: "#555",
    marginBottom: "40px",
  };

  const cardGrid = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  };

  const card = {
    width: "220px",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.2s",
    textDecoration: "none",
    color: "#333",
    display: "block",
  };

  const cardHover = {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  };

  return (
    <div style={container}>
      <h1 style={titleStyle}>E-Commerce Dashboard</h1>
      <p style={subtitleStyle}>
        Manage customers, products, and orders with your admin panel.
      </p>

      <div style={cardGrid}>
        {/* Customers */}
        <Link
          to="/customers"
          style={card}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, cardHover)
          }
          onMouseOut={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            })
          }
        >
          <h3>Customers</h3>
          <p>View, add, delete customers</p>
        </Link>

        {/* Products */}
        <Link
          to="/products"
          style={card}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, cardHover)
          }
          onMouseOut={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            })
          }
        >
          <h3>Products</h3>
          <p>Manage product catalog</p>
        </Link>

        {/* Orders */}
        <Link
          to="/orders"
          style={card}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, cardHover)
          }
          onMouseOut={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            })
          }
        >
          <h3>Orders</h3>
          <p>Track customer orders</p>
        </Link>

        {/* Create Order */}
        <Link
          to="/orders/create"
          style={card}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, cardHover)
          }
          onMouseOut={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            })
          }
        >
          <h3>Create Order</h3>
          <p>Create a new order manually</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
