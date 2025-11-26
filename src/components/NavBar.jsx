import { NavLink } from "react-router-dom";

function NavBar() {
  const navStyle = {
    display: "flex",
    alignItems: "center",
    padding: "15px 25px",
    background: "#2c3e50",
    marginBottom: "20px"
  };

  const linkStyle = {
    color: "#ecf0f1",
    textDecoration: "none",
    marginRight: "20px",
    fontWeight: "bold",
    fontSize: "16px"
  };

  const activeStyle = {
    color: "#1abc9c",
    borderBottom: "2px solid #1abc9c",
    paddingBottom: "3px"
  };

  return (
    <nav style={navStyle}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Home
      </NavLink>

      <NavLink
        to="/customers"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Customers
      </NavLink>
      <NavLink
        to="/employees"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Employees
      </NavLink>

      <NavLink
        to="/products"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Products
      </NavLink>

      <NavLink
        to="/orders"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Orders
      </NavLink>

      <NavLink
        to="/orders/create"
        style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
      >
        Create Order
      </NavLink>
    </nav>
  );
}

export default NavBar;
