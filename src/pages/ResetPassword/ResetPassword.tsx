import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { resetPassword } from "../../services/authServices";
import toast from "../../utils/toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!location.state || !location.state.email || !location.state.verificationCode) {
      navigate("/login");
    } else {
      setEmail(location.state.email);
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return toast.error("Şifre en az 6 karakter olmalı.");
    }
    if (password !== confirm) {
      return toast.error("Şifreler uyuşmuyor.");
    }

    setLoading(true);
    const res = await resetPassword(email, password, location.state.verificationCode);
    setLoading(false);

    if (res.success) {
      toast.success("Şifreniz başarıyla güncellendi.");
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow bg-white"
        style={{ width: "500px" }}
      >
        <h4 className="mb-3 text-center">Yeni Şifre Belirle</h4>
        <input
          type="password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Yeni şifre"
        />
        <input
          type="password"
          className="form-control mb-3"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Şifreyi tekrar girin"
        />
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Güncelleniyor...
            </>
          ) : (
            "Şifreyi Güncelle"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
