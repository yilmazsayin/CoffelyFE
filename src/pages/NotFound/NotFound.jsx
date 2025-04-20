import React from "react";

const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <h1 className="display-1" style={{color: "#966b54"}}>404</h1>
      <p className="lead text-muted mb-4">Aradığınız sayfa bulunamadı.</p>
    </div>
  );
};

export default NotFound;
