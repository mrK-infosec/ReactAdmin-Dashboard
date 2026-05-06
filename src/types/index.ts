// Types for the Admin Dashboard

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "inactive";
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalSales: number;
  activeOrders: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}
