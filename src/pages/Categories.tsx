import { useState } from "react";
import { Header, Footer } from "../components";
import "../styles/pages.css";

interface Category {
  id: number;
  name: string;
  productCount: number;
  status: "active" | "inactive";
}

const mockCategories: Category[] = [
  { id: 1, name: "Electronics", productCount: 45, status: "active" },
  { id: 2, name: "Accessories", productCount: 120, status: "active" },
  { id: 3, name: "Furniture", productCount: 30, status: "active" },
  { id: 4, name: "Software", productCount: 15, status: "inactive" },
];

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", productCount: 0, status: "active" as "active" | "inactive" });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.max(0, ...categories.map(c => c.id)) + 1;
    setCategories([...categories, { id, ...newCategory }]);
    setIsAddModalOpen(false);
    setNewCategory({ name: "", productCount: 0, status: "active" });
  };

  const toggleStatus = (id: number) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Product Categories</h1>
            <p className="page-subtitle">Organize your product catalog.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>+ Add Category</button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Product Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>#{category.id}</td>
                    <td><strong>{category.name}</strong></td>
                    <td>{category.productCount} items</td>
                    <td>
                      <span className={`status status-${category.status}`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button className="btn btn-small btn-secondary" onClick={() => toggleStatus(category.id)}>Toggle</button>
                      <button className="btn btn-small btn-danger" onClick={() => handleDelete(category.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isAddModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Category</h2>
                <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>✕</button>
              </div>
              <form className="modal-body" onSubmit={handleAddCategory}>
                <div className="form-group">
                  <label>Category Name</label>
                  <input type="text" className="form-input" required value={newCategory.name} onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="form-input" value={newCategory.status} onChange={(e) => setNewCategory({...newCategory, status: e.target.value as "active" | "inactive"})}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Category</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
