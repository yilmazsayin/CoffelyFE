import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Ortak yapılar
import Navbar from "./components/Navbar/Navbar.jsx";
import PublicRoute from './components/PublicRoute/PublicRoute.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

// Sayfalar
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/Home/Home.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Footer from './pages/Footer/Footer.jsx'
import Admin from './pages/Admin/Admin.jsx'

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
                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route path="/login" element={<PublicRoute element={<Login />} />} />
                <Route path="/register" element={<PublicRoute element={<Register />} />} />
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />
                <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
                <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
                <Route path="/admin" element={ <PrivateRoute element={<Admin />} adminRequired={true} />}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer/>
          <ToastContainer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
