import { createContext, useContext, useState, type ReactNode } from "react";

export type OrderStatus = "DRAFT" | "PENDING_SOURCING" | "SOURCING_IN_PROGRESS" | "IN_TRANSIT" | "RECEIVED_IN_WAREHOUSE" | "READY_TO_SHIP" | "DELIVERED" | "CANCELLED";

export type InvoiceStatus = "NOT_GENERATED" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED";

export interface Order {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  date: string;
  invoiceStatus: InvoiceStatus;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status" | "invoiceStatus">) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-001", customerName: "TechCorp Inc.", productName: "Mechanical Keyboards", quantity: 50, totalAmount: 4500, status: "DELIVERED", date: "2023-04-10", invoiceStatus: "APPROVED" },
    { id: "ORD-002", customerName: "Design Studio", productName: "Ergonomic Chairs", quantity: 12, totalAmount: 2400, status: "PENDING_SOURCING", date: "2023-04-14", invoiceStatus: "PENDING_APPROVAL" },
    { id: "ORD-003", customerName: "Global Trade LLC", productName: "USB-C Hubs", quantity: 200, totalAmount: 3000, status: "IN_TRANSIT", date: "2023-04-12", invoiceStatus: "APPROVED" },
    { id: "ORD-004", customerName: "Startup Hub", productName: "Monitors 27-inch", quantity: 5, totalAmount: 1500, status: "SOURCING_IN_PROGRESS", date: "2023-04-13", invoiceStatus: "NOT_GENERATED" },
  ]);

  const addOrder = (orderData: Omit<Order, "id" | "date" | "status" | "invoiceStatus">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-00${orders.length + 1}`,
      status: "PENDING_SOURCING", // Automatically goes to procurement queue
      date: new Date().toISOString().split("T")[0],
      invoiceStatus: "NOT_GENERATED",
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, invoiceStatus: status } : o)));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, updateInvoiceStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
