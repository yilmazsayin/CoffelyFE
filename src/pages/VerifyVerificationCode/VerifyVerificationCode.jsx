import React, { useState } from "react";
import { verifyVerificationCode, register } from "../../services/authServices";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import toast from '../../utils/toast';
import { Spinner } from "react-bootstrap";

const VerifyVerificationCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { data, type } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await verifyVerificationCode(data.email, code);
    if (res.success) {
      if (type === "resetPassword") {
        toast.success("Kod doğrulandı, yeni şifrenizi belirleyin.");
        navigate("/reset-password", { state: { email: data.email, verificationCode: code } });
      } else {
        const registerRes = await register(data, code);
        if (registerRes.success) {
          toast.success("Kayıt işlemi başarılı!");
          navigate("/login");
        } else {
          toast.error(registerRes.message);
        }
      }
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="verification-container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-white" style={{ width: "500px" }}>
        <h4 className="mb-3 text-center">Doğrulama Kodu</h4>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          className="form-control mb-3"
          value={code}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "");
            setCode(numericValue);
          }}
          placeholder="Kodunuzu girin"
        />
        <small className="text-muted d-block mb-3">
          {type === "resetPassword"
            ? "Şifre yenileme işlemini tamamlamak için e-posta adresinize gelen kodu girin."
            : "Kayıt işlemini tamamlamak için e-posta adresinize gönderilen doğrulama kodunu girin."}
        </small>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{" "}
              İşleniyor...
            </>
          ) : (
            "Doğrula"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyVerificationCode;
