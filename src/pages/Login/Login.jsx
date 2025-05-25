import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";
import { useAuth } from '../../context/AuthContext'
import toast from '../../utils/toast.js';
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const { login } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const res = await login(email, password);
    if (res.success) {
      toast.success("Giriş başarılı!");
      setUser(res.user);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="login-container">
      <div className="card p-4">
        <h1 className="text-center mb-4">Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-posta
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ornek@mail.com"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="******"
            />
          </div>

          <div className="text-center mb-3">
            <button type="submit" className="btn btn-primary w-100 p-2">
              Giriş Yap
            </button>
          </div>
        </form>

        <div className="text-center mt-2">
          <span>Henüz hesabın yok mu? </span>
          <Link to="/register">Kayıt Ol</Link>
        </div>

        <div className="text-center mt-2">
          <Link to="/forgot-password">Şifremi Unuttum?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
