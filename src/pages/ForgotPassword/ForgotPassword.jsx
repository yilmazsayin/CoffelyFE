import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!", {
      position: "top-center",
      autoClose: 5000,
      onClose: () => navigate("/login"),
    });
  };

  return (
    <div className="forgot-password-container">
      <div className="card p-4">
        <h3 className="text-center mb-4">Şifremi Unuttum</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-posta Adresi
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="ornek@mail.com"
            />
          </div>

          <div className="text-center mb-3">
            <button type="submit" className="btn btn-primary w-100 p-2">
              Şifre Sıfırlama Bağlantısı Gönder
            </button>
          </div>
        </form>

        <div className="text-center mt-2">
          <span>Hesabına tekrar mı giriş yapmak istiyorsun? </span>
          <Link to="/login">Giriş Yap</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
