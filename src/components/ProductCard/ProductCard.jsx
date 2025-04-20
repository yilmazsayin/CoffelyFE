import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      className="col-12 col-sm-6 col-lg-3 mb-4 product-card-wrapper"
      onClick={onClick}
    >
      <div className="card h-100 shadow-sm product-card">
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top product-card-img"
        />
        <div className="card-body product-card-body">
          <h5 className="card-title product-card-title">{product.name}</h5>
          <p className="card-text product-card-price">₺{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
