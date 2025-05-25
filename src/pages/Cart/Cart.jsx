import { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import toast from '../../utils/toast';
import { fetchProductById } from "../../services/productServices";
import { createOrder } from "../../services/orderServices";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem, clearCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkoutFormRef = useRef(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutFormData, setCheckoutFormData] = useState({
    address: "",
    cardNumber: "",
    phoneNumber: "",
    cvv: "",
  });
  const [cartItemDetails, setCartItemDetails] = useState([]);

  const fetchCartItemDetails = async () => {
    let details = [];
    for (let cartItem of cartItems) {
      const res = await fetchProductById(cartItem.product);
      if (res.success) {
        details.push(res.data);
      }
    }
    setCartItemDetails(details);
  };

  const getCartItemFromId = (id) =>
    cartItems.find((item) => item.product === id);

  const handleCheckout = async () => {
    const { address, cardNumber, cvv, phoneNumber } = checkoutFormData;
    if (!address || !cardNumber || !cvv || !phoneNumber) {
      toast.error("Bütün bilgileri doldurun!");
    } else {
      const order = {
        user: user._id,
        items: cartItems,
        address: address,
        paymentInfo: {
          cardNumber,
          cvv,
        },
      };
      const res = await createOrder(order);
      if (res.success) {
        toast.success(res.message);
        clearCart();
        setCartItemDetails([]);
        navigate("/orders");
      } else {
        toast.success(res.message);
      }
    }
  };

  useEffect(() => {
    fetchCartItemDetails();
  }, []);

  return (
    <div className="cart-container container py-5 bg-light my-3">
      <h1 className="text-center mb-4">Sepetim</h1>
      <div className="cart-card bg-white p-4 rounded shadow-sm">
        {cartItemDetails.length === 0 ? (
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
              {cartItemDetails.map((item) => {
                return (
                  <li
                    key={item._id}
                    className="cart-item d-flex justify-content-between align-items-center py-3 border-bottom"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details flex-grow-1 ms-3">
                      <div class="flex-row d-flex justify-content-between">
                        <h2 className="cart-item-name text-start">
                          {item.name}
                        </h2>
                        <button
                          className="cart-item-remove btn btn-danger btn-sm mt-2"
                          onClick={() => {
                            removeFromCart(item._id);
                            setCartItemDetails((prev) => {
                              const updated = prev.filter(
                                (_item) => _item._id !== item._id
                              );
                              return updated;
                            });
                          }}
                        >
                          Sepetten Çıkar
                        </button>
                      </div>
                      <p className="text-muted">
                        Fiyat: {item.price.toFixed(2)}₺
                      </p>
                      <div className="d-flex align-items-center">
                        <label
                          htmlFor={`quantity-${item._id}`}
                          className="me-2"
                        >
                          Miktar:
                        </label>
                        <input
                          type="number"
                          defaultValue={getCartItemFromId(item._id)?.quantity}
                          value={getCartItemFromId(item._id)?.quantity}
                          id={`quantity-${item.id}`}
                          min="1"
                          className="form-control form-control-sm quantity-input"
                          onChange={(e) => {
                            const valueStr = e.target.value;
                            const value =
                              valueStr === "" ? 1 : Number(valueStr);
                            if (value < 1 || isNaN(value)) {
                              updateCartItem(item._id, 1);
                            } else {
                              updateCartItem(item._id, value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart-total d-flex justify-content-between align-items-center mt-4">
              <p className="h4 mb-0">
                Toplam:{" "}
                {cartItems.reduce((total, current) => {
                  const itemDetail = cartItemDetails.find(
                    (cartItem) => cartItem._id === current.product
                  );
                  return total + itemDetail.price * current.quantity;
                }, 0)}
                ₺
              </p>

              <div className="d-flex flex-column align-items-end">
                <button
                  className="clear-cart-btn btn btn-danger mb-2"
                  onClick={() => {
                    clearCart();
                    setCartItemDetails([]);
                  }}
                >
                  Sepeti Temizle
                </button>
              </div>
            </div>
            <button
              className="place-order-btn btn btn-primary w-100 p-2 mt-2"
              onClick={() => setShowCheckoutForm(true)}
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
              value={checkoutFormData.address}
              onChange={(e) => {
                setCheckoutFormData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
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
              value={checkoutFormData.phoneNumber}
              onChange={(e) => {
                setCheckoutFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }));
              }}
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
                value={checkoutFormData.cardNumber}
                onChange={(e) => {
                  setCheckoutFormData((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }));
                }}
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
                value={checkoutFormData.cvv}
                onChange={(e) => {
                  setCheckoutFormData((prev) => ({
                    ...prev,
                    cvv: e.target.value,
                  }));
                }}
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
