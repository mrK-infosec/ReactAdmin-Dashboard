import { Header, Footer } from "../components";

import { useOrders, type Order } from "../contexts/OrderContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/pages.css";

export const Invoices = () => {
  const { orders, updateInvoiceStatus } = useOrders();
  
  // Finance should only see invoices that have been requested
  const pendingInvoices = orders.filter(order => order.invoiceStatus !== 'NOT_GENERATED');
  
  const generatePDF = (order: Order) => {
    const doc = new jsPDF();
    const invoiceId = `INV-${order.id.split('-')[1]}`;
    
    const img = new Image();
    img.src = '/logo.png';
    
    const renderPDF = (image: HTMLImageElement | null) => {
      const primaryColor: [number, number, number] = [99, 102, 241];
      
      if (image) {
        doc.addImage(image, 'PNG', 14, 15, 20, 20);
        doc.setFontSize(22);
        doc.setTextColor(...primaryColor);
        doc.text("Dimond Script", 40, 28);
      } else {
        doc.setFontSize(22);
        doc.setTextColor(...primaryColor);
        doc.text("Dimond Script", 14, 28);
      }

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("123 Business Avenue", 14, 40);
      doc.text("Dubai, UAE", 14, 45);
      doc.text("contact@dimondscript.com", 14, 50);

      doc.setFontSize(28);
      doc.setTextColor(40);
      doc.text("INVOICE", 140, 30);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Invoice Number:", 140, 42);
      doc.setTextColor(40);
      doc.text(invoiceId, 175, 42);

      doc.setTextColor(100);
      doc.text("Date of Issue:", 140, 48);
      doc.setTextColor(40);
      doc.text(order.date, 175, 48);

      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text("BILL TO:", 14, 65);
      doc.setFontSize(11);
      doc.setTextColor(40);
      doc.text(order.customerName, 14, 72);

      const unitPrice = order.totalAmount / (order.quantity || 1);

      autoTable(doc, {
        startY: 85,
        headStyles: { fillColor: primaryColor },
        head: [['Description', 'Quantity', 'Unit Price', 'Total']],
        body: [
          [
            order.productName, 
            order.quantity.toString(), 
            `$${unitPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}`, 
            `$${order.totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}`
          ]
        ],
        theme: 'grid',
      });

      const finalY = (doc as any).lastAutoTable.finalY || 110;
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text("Total Due:", 130, finalY + 15);
      doc.setTextColor(...primaryColor);
      doc.text(`$${order.totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}`, 165, finalY + 15);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Thank you for your business!", 14, finalY + 35);
      
      doc.save(`${invoiceId}.pdf`);
    };

    img.onload = () => renderPDF(img);
    img.onerror = () => renderPDF(null);
  };
  
  return (
    <div className="page-content">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Finance - Invoice Approvals</h1>
            <p className="page-subtitle">Review, approve, or reject sales invoices before generation.</p>
          </div>
        </div>
        <div className="card">
          <div className="table-wrapper">
             <table className="data-table">
               <thead>
                 <tr>
                   <th>Invoice ID</th>
                   <th>Related Order</th>
                   <th>Date</th>
                   <th>Customer</th>
                   <th>Amount</th>
                   <th>Status</th>
                   <th>Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {pendingInvoices.map((order) => (
                   <tr key={order.id}>
                     <td><strong>INV-{order.id.split('-')[1]}</strong></td>
                     <td><span className="stock-available">{order.id}</span></td>
                     <td>{order.date}</td>
                     <td>{order.customerName}</td>
                     <td>${order.totalAmount.toLocaleString()}</td>
                     <td>
                        <span className={`status ${order.invoiceStatus === 'APPROVED' ? 'status-active' : order.invoiceStatus === 'REJECTED' ? 'status-inactive' : 'status-pending'}`}>
                          {order.invoiceStatus.replace(/_/g, " ")}
                        </span>
                     </td>
                     <td style={{ display: 'flex', gap: '8px' }}>
                       {order.invoiceStatus === 'PENDING_APPROVAL' ? (
                         <>
                           <button className="btn btn-small btn-primary" onClick={() => updateInvoiceStatus(order.id, "APPROVED")}>
                             Approve
                           </button>
                           <button className="btn btn-small btn-danger" onClick={() => updateInvoiceStatus(order.id, "REJECTED")}>
                             Reject
                           </button>
                         </>
                       ) : order.invoiceStatus === 'APPROVED' ? (
                         <button className="btn btn-small btn-secondary" onClick={() => generatePDF(order)}>
                           Download PDF
                         </button>
                       ) : (
                         <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Rejected</span>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
