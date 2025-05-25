import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import toast from '../../utils/toast';

const ProductModal = ({
  selectedProduct,
  quantity,
  totalPrice,
  increment,
  decrement,
  closeModal,
}) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ product: selectedProduct._id, quantity });
    toast.success("Ürün başarıyla sepete eklendi.")
    closeModal();
  };

  return (
    <div
      className="modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
        opacity: 1,
        transition: "opacity 0.3s ease-in-out",
      }}
      onClick={closeModal}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
          width: "90%",
          maxWidth: "400px",
          transform: "translateY(0)",
          transition: "transform 0.3s ease-out",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <div
          className="modal-image"
          style={{ marginBottom: "0.5rem", textAlign: "center" }}
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "contain",
              borderRadius: "0.5rem",
            }}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
          <h5>{selectedProduct.name}</h5>
          <p className="mb-0">₺{selectedProduct.price}</p>
        </div>

        <div className="product-description">
          <p className="text-muted small">{selectedProduct.description}</p>
        </div>

        <div className="d-flex align-items-center justify-content-center mb-2">
          <button className="btn btn-outline-secondary" onClick={decrement}>
            -
          </button>
          <span className="mx-3">{quantity}</span>
          <button className="btn btn-outline-secondary" onClick={increment}>
            +
          </button>
        </div>

        <div className="text-center mt-2">
          <p>
            <strong>Toplam Fiyat: ₺{totalPrice}</strong>
          </p>
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          disabled={quantity === 0}
          onClick={handleAddToCart}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
