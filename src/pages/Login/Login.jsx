import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    console.log(email, password);
    const isLoginSuccess = login(email, password);
    console.log('isLoginSuccess', isLoginSuccess);
    if (isLoginSuccess) {
      toast.success("Giriş Başarılı!", {
        position: "top-center",
        autoClose: 250,
        onClose: () => navigate("/"),
      });
    } else {
      toast.error("Giriş Başarısız!", {
        position: "top-center",
        autoClose: 500,
        onClose: () => null,
      });
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
