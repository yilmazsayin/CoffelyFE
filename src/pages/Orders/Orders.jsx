import React from "react";
import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import "./Orders.css";

const Orders = () => {
  const orders = [
    {
      id: 1,
      products: [
        { name: "Kahve", image: "/images/filterCoffee.png" },
        { name: "Çikolata", image: "/images/chocolate.png" },
      ],
      totalPrice: 35,
      orderDate: "2025-04-10",
      orderNumber: "ORD12345",
    },
    {
      id: 2,
      products: [
        { name: "Kek", image: "/images/chocolate.png" },
      ],
      totalPrice: 25,
      orderDate: "2025-04-12",
      orderNumber: "ORD12346",
    },
  ];

  return (
    <div className="orders-container">
      <h2><FiPackage className="me-2" /> Siparişlerim</h2>

      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-details">
                <div className="order-info">
                  <p>Sipariş No: {order.orderNumber}</p>
                  <p>Tarih: {order.orderDate}</p>
                  <p>Toplam Ücret: {order.totalPrice} TL</p>
                </div>

                <div className="order-images">
                  {order.products.map((product, index) => (
                    <img key={index} src={product.image} alt={product.name} className="order-image" />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Henüz bir siparişiniz bulunmamaktadır.</p>
        )}
      </div>

      <div className="back-to-home">
        <Link to="/" className="btn btn-primary">
          Ürünleri İncele!
        </Link>
      </div>
    </div>
  );
};

export default Orders;
