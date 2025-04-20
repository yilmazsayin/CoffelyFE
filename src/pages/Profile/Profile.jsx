import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Profile.css";

const Profile = () => {
  const mockUser = {
    name: "Sahte kullanıcı adı ve soyadı",
    phone: "+1234567890",
    email: "test@coffely.com",
  };

  const { logout } = useAuth();

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!"
      )
    ) {
      alert("Hesabınız başarıyla silindi.");
      logout();
    }
  };

  return (
    <div className="profile-container my-4">
      <h2>Profil</h2>

      <div className="profile-info">
        <div className="profile-field">
          <label>Ad</label>
          <p>{mockUser.name}</p> 
        </div>

        <div className="profile-field">
          <label>Telefon</label>
          <p>{mockUser.phone}</p>
        </div>

        <div className="profile-field">
          <label>E-posta</label>
          <p>{mockUser.email}</p>
        </div>
      </div>

      <div className="delete-account">
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Hesabı Sil
        </button>
      </div>
    </div>
  );
};

export default Profile;
