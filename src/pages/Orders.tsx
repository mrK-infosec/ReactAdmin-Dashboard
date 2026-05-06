import { useState } from "react";
import { Header, Footer } from "../components";
import { useOrders, type OrderStatus } from "../contexts/OrderContext";
import "../styles/pages.css";

export const Orders = () => {
  const { orders, addOrder, updateOrderStatus, updateInvoiceStatus } = useOrders();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ customerName: "", productName: "", quantity: 1, totalAmount: 0 });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder(newOrder);
    setIsAddModalOpen(false);
    setNewOrder({ customerName: "", productName: "", quantity: 1, totalAmount: 0 });
  };

  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Client Orders</h1>
            <p className="page-subtitle">Sales team interface to create and track orders.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            + Create Order
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Workflow Status</th>
                  <th>Invoice Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.date}</td>
                    <td>{order.customerName}</td>
                    <td>{order.productName}</td>
                    <td>{order.quantity}</td>
                    <td>${order.totalAmount.toLocaleString()}</td>
                    <td>
                      <span className={`status ${order.status === 'DELIVERED' ? 'status-active' : order.status === 'CANCELLED' ? 'status-inactive' : 'status-pending'}`}>
                        {order.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="sort-select"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        disabled={order.status === 'DELIVERED'}
                      >
                        <option value="DRAFT">DRAFT</option>
                        <option value="PENDING_SOURCING">Submit to Procurement (PENDING_SOURCING)</option>
                        <option value="READY_TO_SHIP">READY TO SHIP</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td>
                      <span className={`status ${order.invoiceStatus === 'APPROVED' ? 'status-active' : order.invoiceStatus === 'REJECTED' ? 'status-inactive' : 'status-pending'}`}>
                        {order.invoiceStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      {order.invoiceStatus === 'NOT_GENERATED' && (
                         <button 
                           className="btn btn-small btn-primary"
                           onClick={() => updateInvoiceStatus(order.id, "PENDING_APPROVAL")}
                         >
                           Request Invoice
                         </button>
                      )}
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
                <h2>Create New Order</h2>
                <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>✕</button>
              </div>
              <form className="modal-body" onSubmit={handleCreateOrder}>
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" className="form-input" required value={newOrder.customerName} onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Product Request</label>
                  <input type="text" className="form-input" required value={newOrder.productName} onChange={(e) => setNewOrder({...newOrder, productName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" min="1" className="form-input" required value={newOrder.quantity} onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label>Total Sales Amount ($)</label>
                  <input type="number" min="0" className="form-input" required value={newOrder.totalAmount} onChange={(e) => setNewOrder({...newOrder, totalAmount: parseFloat(e.target.value)})} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Order</button>
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
