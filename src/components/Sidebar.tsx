// Sidebar Navigation Component
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Image as ImageIcon, 
  Tags, 
  Users, 
  ChevronDown,
  ChevronRight,
  DollarSign
} from "lucide-react";
import "../styles/components.css";

export const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen } = useUser();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    sales: true,
    finance: true,
    procurement: true,
    catalog: true,
    customers: true,
  });

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { 
      id: "sales", label: "Sales Team", isGroup: true,
      children: [
        { id: "orders", label: "Client Orders", icon: <ShoppingCart size={18} />, path: "/orders" },
      ]
    },
    { 
      id: "finance", label: "Finance Dept", isGroup: true,
      children: [
        { id: "invoices", label: "Invoice Approvals", icon: <DollarSign size={18} />, path: "/invoices" },
      ]
    },
    { 
      id: "procurement", label: "Procurement", isGroup: true,
      children: [
        { id: "sourcing", label: "Alibaba Sourcing", icon: <ShoppingCart size={18} />, path: "/sourcing" },
        { id: "suppliers", label: "Suppliers", icon: <Users size={18} />, path: "/suppliers" },
      ]
    },
    { 
      id: "catalog", label: "Product Catalog", isGroup: true,
      children: [
        { id: "products", label: "Products", icon: <ImageIcon size={18} />, path: "/products" },
        { id: "categories", label: "Categories", icon: <Tags size={18} />, path: "/categories" },
      ]
    },
    { 
      id: "customers", label: "Customers", isGroup: true,
      children: [
        { id: "customers-list", label: "Client Directory", icon: <Users size={18} />, path: "/users" },
      ]
    },
  ];

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          item.isGroup ? (
            <div key={item.id} className="nav-group">
              <button 
                className={`nav-group-header ${!isSidebarOpen ? "hidden" : ""}`}
                onClick={() => toggleMenu(item.id)}
              >
                <span className="nav-group-icon">
                  {openMenus[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <span className="nav-group-label">{item.label}</span>
              </button>
              {(openMenus[item.id] || !isSidebarOpen) && (
                <div className="nav-group-children">
                  {item.children?.map(child => (
                    <Link
                      key={child.id}
                      to={child.path}
                      className={`nav-link ${location.pathname === child.path ? "active" : ""}`}
                      title={!isSidebarOpen ? child.label : undefined}
                    >
                      <span className="nav-icon">{child.icon}</span>
                      {isSidebarOpen && <span className="nav-label">{child.label}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.id}
              to={item.path!}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              title={!isSidebarOpen ? item.label : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          )
        ))}
      </nav>
    </aside>
  );
};
