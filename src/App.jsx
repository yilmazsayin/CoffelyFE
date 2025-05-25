import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Ortak yapılar
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Sayfalar
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import VerifyVerificationCode from './pages/VerifyVerificationCode/VerifyVerificationCode.jsx';
import ResetPassword from "./pages/ResetPassword/ResetPassword.js";

// Yönlendirme yapıalrı
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute/PublicRoute.jsx";

// Context
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-fill">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={<PublicRoute element={<Login />} />}
                />
                <Route
                  path="/register"
                  element={<PublicRoute element={<Register />} />}
                />
                <Route
                  path="/forgot-password"
                  element={<PublicRoute element={<ForgotPassword />} />}
                />
                <Route
                  path="/reset-password"
                  element={<PublicRoute element={<ResetPassword />} />}
                />
                <Route
                  path="/verifyVerificationCode"
                  element={<PublicRoute element={<VerifyVerificationCode/>}/>}
                />
                <Route
                  path="/cart"
                  element={<PrivateRoute element={<Cart />} />}
                />
                <Route
                  path="/orders"
                  element={<PrivateRoute element={<Orders />} />}
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute element={<Admin />} adminRequired={true} />
                  }
                />
                <Route
                  path="/profile"
                  element={<PrivateRoute element={<Profile />} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
        <ToastContainer  />
      </Router>
    </AuthProvider>
  );
}

export default App;
