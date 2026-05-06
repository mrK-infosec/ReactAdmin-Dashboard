import { useState } from "react";
import { Header, Footer } from "../components";
import "../styles/pages.css";

interface Supplier {
  id: string;
  name: string;
  contactName: string;
  alibabaLink: string;
  leadTimeDays: number;
  rating: number;
}

const mockSuppliers: Supplier[] = [
  { id: "SUP-001", name: "Shenzhen Tech Electronics", contactName: "Li Wei", alibabaLink: "https://alibaba.com/supplier/1", leadTimeDays: 14, rating: 4.8 },
  { id: "SUP-002", name: "Guangzhou Furniture Co", contactName: "Chen Xia", alibabaLink: "https://alibaba.com/supplier/2", leadTimeDays: 25, rating: 4.5 },
];

export const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: "", contactName: "", alibabaLink: "", leadTimeDays: 7, rating: 5 });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SUP-00${suppliers.length + 1}`;
    setSuppliers([...suppliers, { id, ...newSupplier }]);
    setIsAddModalOpen(false);
    setNewSupplier({ name: "", contactName: "", alibabaLink: "", leadTimeDays: 7, rating: 5 });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this supplier?")) {
      setSuppliers(suppliers.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Alibaba Suppliers</h1>
            <p className="page-subtitle">Manage procurement supplier contacts and ratings.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>+ Add Supplier</button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Supplier ID</th>
                  <th>Company Name</th>
                  <th>Contact Person</th>
                  <th>Alibaba Link</th>
                  <th>Lead Time</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td><strong>{supplier.id}</strong></td>
                    <td>{supplier.name}</td>
                    <td>{supplier.contactName}</td>
                    <td><a href={supplier.alibabaLink} target="_blank" rel="noreferrer" style={{color: 'var(--primary-color)'}}>View Profile</a></td>
                    <td>{supplier.leadTimeDays} days</td>
                    <td>{supplier.rating} / 5.0</td>
                    <td>
                      <button className="btn btn-small btn-danger" onClick={() => handleDelete(supplier.id)}>Delete</button>
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
                <h2>Add New Supplier</h2>
                <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>✕</button>
              </div>
              <form className="modal-body" onSubmit={handleAddSupplier}>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" className="form-input" required value={newSupplier.name} onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Contact Name</label>
                  <input type="text" className="form-input" required value={newSupplier.contactName} onChange={(e) => setNewSupplier({...newSupplier, contactName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Alibaba Profile URL</label>
                  <input type="url" className="form-input" required value={newSupplier.alibabaLink} onChange={(e) => setNewSupplier({...newSupplier, alibabaLink: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Est. Lead Time (Days)</label>
                  <input type="number" min="1" className="form-input" required value={newSupplier.leadTimeDays} onChange={(e) => setNewSupplier({...newSupplier, leadTimeDays: parseInt(e.target.value)})} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Supplier</button>
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
