import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Ahmet"
              />
            </div>
            <div className="col-6">
              <label htmlFor="lastName" className="form-label">
                Soyad
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Mehmet"
              />
            </div>
          </div>

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
              placeholder="ahmet.mehmet@example.com"
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

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Adres
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="İstanbul, Beşiktaş, Barbaros Bulvarı No: 123"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Telefon Numarası
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="0 555 555 55 55"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success w-100 p-2">
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
