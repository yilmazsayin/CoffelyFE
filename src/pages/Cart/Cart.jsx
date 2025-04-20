import React, { useContext, useState, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem, clearCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [showCheckoutForm, setShowCheckoutForm] = useState(false); 
  const [address, setAddress] = useState(""); 
  const [cardNumber, setCardNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const checkoutFormRef = useRef(null); 

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
      updateCartItem(productId, newQuantity);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handlePlaceOrder = () => {
    if (!user) {
      toast.info("Öncelikle giriş yapmalısınız.", {
        position: "top-center",
        autoClose: 1000,
        onClose: () => navigate("/login"),
      });
      return; 
    }
    setShowCheckoutForm(true); 

    
    window.scrollTo({
      top: checkoutFormRef.current.offsetTop,
      behavior: "smooth", 
    });
  };

  const handleCheckout = () => {
    if (!address || !cardNumber || !phoneNumber || !cvv) {
      toast.error("Lütfen tüm bilgileri doldurun.", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    
    toast.success("Siparişiniz başarıyla alındı!");
    clearCart(); 
    setShowCheckoutForm(false); 
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container container py-5 bg-light my-3">
      <h1 className="text-center mb-4">Sepetim</h1>

      <div className="cart-card bg-white p-4 rounded shadow-sm">
        {cartItems.length === 0 ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <img src="/images/noCoffee.png" className="noCoffee" />
            <p className="cart-empty text-muted text-center mt-3">
              Sepetinizde ürün bulunmamaktadır.
            </p>
          </div>
        ) : (
          <div>
            <ul className="list-unstyled">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="cart-item d-flex justify-content-between align-items-center py-3 border-bottom"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details flex-grow-1 ms-3">
                    <div class="flex-row d-flex justify-content-between">
                      <h2 className="cart-item-name text-start">{item.name}</h2>
                      <button
                        className="cart-item-remove btn btn-danger btn-sm mt-2"
                        onClick={() => handleRemove(item.id)}
                      >
                        Sepetten Çıkar
                      </button>
                    </div>
                    <p className="text-muted">
                      Fiyat: {item.price.toFixed(2)}₺
                    </p>
                    <div className="d-flex align-items-center">
                      <label htmlFor={`quantity-${item.id}`} className="me-2">
                        Miktar:
                      </label>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        min="1"
                        className="form-control form-control-sm quantity-input"
                        onChange={(e) => handleQuantityChange(item.id, e)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total d-flex justify-content-between align-items-center mt-4">
              <p className="h4 mb-0">Toplam: {calculateTotal().toFixed(2)}₺</p>

              <div className="d-flex flex-column align-items-end">
                <button
                  className="clear-cart-btn btn btn-danger mb-2"
                  onClick={handleClearCart}
                >
                  Sepeti Temizle
                </button>
              </div>
            </div>
            <button
              className="place-order-btn btn btn-primary w-100 p-2 mt-2"
              onClick={handlePlaceOrder}
            >
              Devam Et
            </button>
          </div>
        )}
      </div>

      {cartItems.length > 0 && showCheckoutForm && (
        <div
          ref={checkoutFormRef} 
          className="checkout-form bg-white p-4 rounded shadow-sm mt-4"
        >
          <h4>Siparişi Tamamlamak İçin</h4>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Adres:
            </label>
            <textarea
              id="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="İstanbul, Kadıköy, Bahariye Caddesi No:12"
              rows="4"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Telefon Numarası:
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="05xxxxxxxxx"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <div className="w-75 me-2">
              <label htmlFor="cardNumber" className="form-label">
                Kart Numarası:
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="5500 0000 0000 0004"
                className="form-control"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="w-25 ms-2">
              <label htmlFor="cvv" className="form-label">
                CVV:
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="123"
                className="form-control"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-success w-100" onClick={handleCheckout}>
            Siparişi Tamamla
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
