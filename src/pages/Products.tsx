// Products Page
import { useState } from "react";
import { Header, Footer } from "../components";
import { mockProducts } from "../data/mockData";
import type { Product } from "../types";
import "../styles/pages.css";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "Electronics", price: 0, stock: 0, status: "active" as "active" | "inactive" });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts([...products, { id, ...newProduct }]);
    setIsAddModalOpen(false);
    setNewProduct({ name: "", category: "Electronics", price: 0, stock: 0, status: "active" });
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "stock":
        return a.stock - b.stock;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "active" ? "inactive" : "active",
            }
          : product,
      ),
    );
  };

  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <h1>Products Management</h1>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>+ Add Product</button>
        </div>

        <div className="card">
          <div className="table-header">
            <div>
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "name" | "price" | "stock")
                }
                className="sort-select"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
              </select>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span
                        className={
                          product.stock > 0 ? "stock-available" : "stock-empty"
                        }
                      >
                        {product.stock} items
                      </span>
                    </td>
                    <td>
                      <span className={`status status-${product.status}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button
                        className="btn btn-small btn-secondary"
                        onClick={() => toggleStatus(product.id)}
                      >
                        Toggle
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <p>Showing {sortedProducts.length} products</p>
          </div>
        </div>
      </main>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="form-input"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    className="form-input"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Software">Software</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    required
                    min="0"
                    step="0.01"
                    className="form-input"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    required
                    min="0"
                    className="form-input"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    className="form-input"
                    value={newProduct.status}
                    onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value as "active" | "inactive" })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
