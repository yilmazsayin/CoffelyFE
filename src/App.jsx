import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Ortak yapılar
import Navbar from "./components/Navbar/Navbar.jsx";

// Sayfalar
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/Home/Home.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Cart from "./pages/Cart/Cart.jsx";

// Context
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-fill">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <ToastContainer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
