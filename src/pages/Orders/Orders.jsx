import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { listOrders } from "../../services/orderServices";
import "./Orders.css";
import toast from "../../utils/toast";
import moment from "moment";
import "moment/locale/tr";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await listOrders();
    if (res.success) {
      setOrders(res.data);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>
        <FiPackage className="me-2" /> Siparişlerim
      </h2>

      <div className="orders-list">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <div className="order-details">
                <div className="order-info">
                  <p>Sipariş No: {order._id}</p>
                  <p>Tarih: {moment(order.createDate).format("D MMMM YYYY, HH:mm")}</p>
                  <p>
                    Toplam Ücret:{" "}
                    {order.items.reduce((total, item) => {
                      return total + item.quantity * item.product.price;
                    }, 0)}{" "}
                    TL
                  </p>
                </div>

                <div className="order-images">
                  {order.items.map((item, index) => (
                    <img key={index} src={item.product.image} className="order-image" />
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
