import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Ortak yapılar
import Navbar from "./components/Navbar/Navbar.jsx";

// Sayfalar
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from './pages/NotFound/NotFound.jsx'

// Context
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-fill">
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
