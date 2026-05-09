// Header Component
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Menu, ChevronDown, Settings, LogOut } from "lucide-react";
import "../styles/components.css";

export const Header = () => {
  const { userName, avatarUrl, isSidebarOpen, setIsSidebarOpen } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="toggle-btn toggle-header" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} color="currentColor" />
          </button>
        </div>
        
        <div className="brand-container">
          <img src="/logo.png" alt="Dimond Script Logo" className="brand-logo" />
          <h2 className="page-title brand-title">Dimond Script</h2>
        </div>
        
        <div className="header-actions">
          <div className="profile-container">
            <button 
              className="user-profile" 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <img
                src={avatarUrl}
                alt="User Profile"
                className="profile-avatar"
              />
              <span className="user-name">{userName}</span>
              <ChevronDown size={16} color="currentColor" />
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link to="/settings" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                  <Settings size={16} />
                  <span>Edit Profile</span>
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-danger" onClick={() => { setIsProfileOpen(false); alert("Logout clicked"); }}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
