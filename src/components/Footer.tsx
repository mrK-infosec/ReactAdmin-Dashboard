import { Link } from "react-router-dom";
import "../styles/components.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Dimond Script. All rights reserved.</p>
        <div className="footer-links">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Support</Link>
        </div>
      </div>
    </footer>
  );
};
