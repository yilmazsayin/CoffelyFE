import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "../../utils/toast";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";
import { sendEmailVerification } from "../../services/authServices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await sendEmailVerification(email, "resetPassword");
    if (res.success) {
      toast.success(
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!"
      );
      navigate("/verifyVerificationCode", { state: { type: "resetPassword", data: { email } }})
    } else {
      toast.error(res.message || "Bir hata oluştu.");
    }
    setLoading(false);
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
              disabled={loading}
            />
          </div>

          <div className="text-center mb-3">
            <button
              type="submit"
              className="btn btn-primary w-100 p-2 d-flex align-items-center justify-content-center"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Gönderiliyor...
                </>
              ) : (
                "Şifre Sıfırlama Bağlantısı Gönder"
              )}
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
