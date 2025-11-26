const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }

  return res.json();
}

export const api = {
  getCustomers: () => request("/customers"),
  createCustomer: data => request("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateCustomer: (id, data) => request(`/customers/${id}`, {
  method: "PUT",
  body: JSON.stringify(data),
}),
updateProduct: (id, data) => request(`/products/${id}`, {
  method: "PUT",
  body: JSON.stringify(data),
}),


  deleteCustomer: id => request(`/customers/${id}`, { method: "DELETE" }),

  getProducts: () => request("/products"),
  createProduct: data => request("/products", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  deleteProduct: id => request(`/products/${id}`, { method: "DELETE" }),

  getOrders: () => request("/orders"),
  createOrder: data => request("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  }),

   getEmployees: () => request("/employees"),
  createEmployee: (data) => request("/employees", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  updateEmployee: (id, data) => request(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  deleteEmployee: (id) => request(`/employees/${id}`, {
    method: "DELETE"
  }),
};
