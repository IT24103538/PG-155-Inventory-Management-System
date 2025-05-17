// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Inventory Management System
            </Link>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            <NavButton to="/" text="Item" />
            <NavButton to="/inventory" text="Inventory" />
            <NavButton to="/transaction" text="Transaction" />
            <NavButton to="/deleted-items" text="Deleted Item" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ to, text }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-300"
  >
    {text}
  </Link>
);

export default Navbar;
