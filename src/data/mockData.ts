// Mock data for the Admin Dashboard
import type { User, Product, DashboardStats } from "../types";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Viewer",
    status: "inactive",
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "active",
    joinDate: "2024-04-05",
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    stock: 15,
    status: "active",
  },
  {
    id: 2,
    name: "Monitor",
    price: 299.99,
    category: "Electronics",
    stock: 32,
    status: "active",
  },
  {
    id: 3,
    name: "Keyboard",
    price: 79.99,
    category: "Accessories",
    stock: 0,
    status: "inactive",
  },
  {
    id: 4,
    name: "Mouse",
    price: 49.99,
    category: "Accessories",
    stock: 50,
    status: "active",
  },
  {
    id: 5,
    name: "Desk Chair",
    price: 199.99,
    category: "Furniture",
    stock: 8,
    status: "active",
  },
];

export const dashboardStats: DashboardStats = {
  totalUsers: 4,
  totalProducts: 5,
  totalSales: 15420,
  activeOrders: 12,
};
