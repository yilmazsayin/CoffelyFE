import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { deleteAccount } from '../../services/userServices.js'
import "./Profile.css";
import toast from '../../utils/toast.js';

const Profile = () => {

  const { user, logout } = useAuth();
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!"
      )
    ) {
      const res = await deleteAccount()
      if(res.success) {
        toast.success(res.message);
        logout();
      }
      else {
        toast.error(res.message);
        logout();
      }
    }
  };

  return (
    <div className="profile-container my-4">
      <h2>Profil</h2>

      <div className="profile-info">
        <div className="profile-field">
          <label>Ad</label>
          <p>{user.firstName}</p> 
        </div>

        <div className="profile-field">
          <label>Telefon</label>
          <p>{user.lastName}</p>
        </div>

        <div className="profile-field">
          <label>E-posta</label>
          <p>{user.email}</p>
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
