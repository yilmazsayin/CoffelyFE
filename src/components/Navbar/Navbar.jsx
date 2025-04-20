import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "/images/logo.png";
import {
  FiLogIn,
  FiShoppingCart,
  FiLogOut,
  FiPackage,
  FiUser,
  FiBox
} from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const collapseRef = useRef();
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useAuth();
  const itemCount = cartItems.length;

  const handleNavLinkClick = () => {
    if (collapseRef.current && window.innerWidth < 992) {
      const collapseElement = new window.bootstrap.Collapse(
        collapseRef.current,
        {
          toggle: false,
        }
      );
      collapseElement.hide();
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-background">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" style={{ height: "65px" }} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNavDropdown"
        ref={collapseRef}
      >
        <ul className="navbar-nav ms-auto">
          {user && (
            <li className="nav-item text-center">
              <Link className="nav-link" to="/cart" onClick={handleNavLinkClick}>
                <FiShoppingCart className="me-2" />
                Sepet
                {itemCount > 0 && (
                  <span className="badge bg-danger ms-1">{itemCount}</span>
                )}
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className="nav-item text-center">
                <Link
                  className="nav-link"
                  to="/profile"
                  onClick={handleNavLinkClick}
                >
                  <FiUser className="me-2" />
                  Profil
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className="nav-link"
                  to="/orders"
                  onClick={handleNavLinkClick}
                >
                  <FiPackage className="me-2" />
                  Siparişler
                </Link>
              </li>

              {user.role === "admin" && (
                <li className="nav-item text-center">
                  <Link
                    className="nav-link"
                    to="/admin"
                    onClick={handleNavLinkClick}
                  >
                    <FiBox className="me-2" />
                    Ürün Yönetimi
                  </Link>
                </li>
              )}

              <li className="nav-item text-center">
                <Link className="nav-link" to="/" onClick={handleLogout}>
                  <FiLogOut className="me-2" />
                  Çıkış Yap
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item text-center">
              <Link
                className="nav-link"
                to="/login"
                onClick={handleNavLinkClick}
              >
                <FiLogIn className="me-2" />
                Giriş Yap
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
