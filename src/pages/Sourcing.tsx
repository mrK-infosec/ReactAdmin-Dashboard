import { Header, Footer } from "../components";
import { useOrders, type OrderStatus } from "../contexts/OrderContext";
import "../styles/pages.css";

export const Sourcing = () => {
  const { orders, updateOrderStatus } = useOrders();

  // Procurement only cares about active sourcing statuses
  const sourcingOrders = orders.filter(
    o => o.status !== "DRAFT" && o.status !== "DELIVERED" && o.status !== "CANCELLED"
  );

  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Sourcing Hub</h1>
            <p className="page-subtitle">Procurement team interface to fulfill incoming orders.</p>
          </div>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Product Req</th>
                  <th>Qty</th>
                  <th>Order Date</th>
                  <th>Procurement Status</th>
                  <th>Supplier Action</th>
                </tr>
              </thead>
              <tbody>
                {sourcingOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="no-data">No active orders in sourcing queue.</td>
                  </tr>
                ) : (
                  sourcingOrders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.productName}</td>
                      <td>{order.quantity}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status ${order.status === 'READY_TO_SHIP' ? 'status-active' : 'status-pending'}`}>
                          {order.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="sort-select"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        >
                          <option value="PENDING_SOURCING">Find Supplier</option>
                          <option value="SOURCING_IN_PROGRESS">Create PO (In Progress)</option>
                          <option value="IN_TRANSIT">Supplier Shipped (In Transit)</option>
                          <option value="RECEIVED_IN_WAREHOUSE">Received in Warehouse</option>
                          <option value="READY_TO_SHIP">Mark Ready to Ship</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
