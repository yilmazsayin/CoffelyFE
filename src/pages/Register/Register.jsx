import { useState } from "react";
import "./Register.css";
import { sendEmailVerification } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import toast from '../../utils/toast';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value) return "İsim alanı zorunludur";
        if (value.length < 3) return "İsim en az 3 karakter olmalıdır";
        return "";
      case "lastName":
        if (!value) return "Soyisim alanı zorunludur";
        if (value.length < 3) return "Soyisim en az 3 karakter olmalıdır";
        return "";
      case "email":
        if (!value) return "E-posta alanı zorunludur";
        if (!/^\S+@\S+\.\S+$/.test(value))
          return "Geçerli bir e-posta adresi giriniz";
        return "";
      case "password":
        if (!value) return "Şifre alanı zorunludur";
        if (value.length < 6) return "Şifre en az 6 karakter olmalıdır";
        return "";
      case "address":
        if (!value) return "Adres alanı zorunludur";
        if (value.length < 3) return "Adres en az 3 karakter olmalıdır";
        return "";
      case "phone":
        if (!value) return "Telefon numarası zorunludur";
        if (!/^(0?5\d{2}) ?\d{3} ?\d{2} ?\d{2}$/.test(value))
          return "Geçerli bir telefon numarası giriniz, Örn: 0555 555 55 55";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const errorMessage = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg !== "")) {
      toast.error("Lütfen formdaki hataları düzeltin.");
      return;
    }

    // E-mail doğrulama kodu gönder, doğrulama sayfasına geç
    setLoading(true);
    const res = await sendEmailVerification(formData.email, "register");
    if (res.success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      });
      setErrors({});
      navigate("/verifyVerificationCode", { state: { data: formData, type: "register" } });
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="card">
        <h1 className="text-center mb-4">Kayıt Ol</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="firstName" className="form-label">
                Ad
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Ahmet"
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="lastName" className="form-label">
                Soyad
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Mehmet"
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-posta
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ahmet.mehmet@example.com"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              type="password"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="******"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Adres
            </label>
            <textarea
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="İstanbul, Beşiktaş, Barbaros Bulvarı No: 123"
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Telefon Numarası
            </label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0 555 555 55 55"
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`btn btn-success w-100 p-2 d-flex justify-content-center align-items-center ${
                loading ? "opacity-75" : ""
              }`}
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {loading ? "Doğrulama Kodu Gönderiliyor" : "Kayıt Ol"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
