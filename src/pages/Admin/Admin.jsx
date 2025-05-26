import { useContext, useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../services/productServices";
import toast from "../../utils/toast";
import "./Admin.css";
import { CartContext } from "../../context/CartContext";

const Admin = () => {
  const { removeFromCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Ürün adı zorunludur";
        if (value.length < 3) return "Ürün adı en az 3 karakter olmalıdır";
        return "";
      case "price":
        if (value === "" || value === null) return "Fiyat zorunludur";
        if (Number(value) < 0) return "Fiyat negatif olamaz";
        return "";
      case "description":
        if (!value) return "Açıklama zorunludur";
        if (value.length < 5) return "Açıklama en az 5 karakter olmalıdır";
        return "";
      case "image":
        if (!value) return "Fotoğraf alanı zorunludur";
        return "";
      default:
        return "";
    }
  };

  const validateProduct = (product) => {
    const errors = {};
    errors.name = validateField("name", product.name);
    errors.price = validateField("price", product.price);
    errors.description = validateField("description", product.description);
    if (!isEditMode || !product.imagePreview) {
      errors.image = validateField("image", product.image);
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
        const errorMsg = validateField("image", file);
        setErrors((prev) => ({ ...prev, image: errorMsg }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      id: null,
      name: "",
      price: "",
      description: "",
      image: null,
      imagePreview: "",
    });
    setErrors({});
    setIsEditMode(false);
  };

  const handleAddProduct = async () => {
    const validationErrors = validateProduct(currentProduct);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((msg) => msg !== "");
    if (hasErrors) {
      toast.error("Lütfen tüm alanları doğru doldurun!");
      return;
    }

    const formData = new FormData();
    formData.append("name", currentProduct.name);
    formData.append("price", currentProduct.price);
    formData.append("description", currentProduct.description);
    formData.append("image", currentProduct.image);

    setSubmitting(true);
    try {
      const res = await createProduct(formData);
      setProducts((prev) => [...prev, res.product]);
      setShowModal(false);
      resetForm();
      toast.success("Ürün başarıyla eklendi!");
    } catch {
      toast.error("Ürün eklenirken hata oluştu!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProduct = async () => {
    const validationErrors = validateProduct(currentProduct);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((msg) => msg !== "");
    if (hasErrors) {
      toast.error("Lütfen tüm alanları doğru doldurun!");
      return;
    }

    const formData = new FormData();
    formData.append("id", currentProduct._id);
    formData.append("name", currentProduct.name);
    formData.append("price", currentProduct.price);
    formData.append("description", currentProduct.description);
    formData.append("image", currentProduct.image);

    setSubmitting(true);
    try {
      const res = await updateProduct(formData);
      setShowModal(false);
      if (res.success) {
        toast.success(res.message);
        const updatedProducts = await fetchProducts();
        if (updatedProducts.success) {
          setProducts(updatedProducts.data);
        } else {
          toast.error(updatedProducts.message);
        }
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Güncelleme sırasında bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setCurrentProduct({
      ...product,
      imagePreview: product.image,
      image: null,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts(products.filter((p) => p._id !== id));
        removeFromCart(id);
        toast.info("Ürün silindi");
      } else {
        toast.error(res.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchProducts();
      if (res.success) {
        setProducts(res.data);
      } else {
        setProducts([]);
        toast.error(res.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Ürün Yönetimi</h2>
      {!loading && (
        <button
          className="btn btn-success mb-4"
          onClick={() => {
            setShowModal(true);
            resetForm();
          }}
        >
          <FiPlus className="me-2" /> Ürün Ekle
        </button>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header mb-4">
                <h5 className="modal-title">
                  {isEditMode ? "Ürün Güncelle" : "Ürün Ekle"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={submitting}
                ></button>
              </div>
              <div className="modal-body">
                {currentProduct.imagePreview && (
                  <div className="text-center mb-3">
                    <img
                      src={currentProduct.imagePreview}
                      alt="preview"
                      style={{ maxHeight: "200px" }}
                      className="img-thumbnail"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control mb-3 ${
                    errors.image ? "is-invalid" : ""
                  }`}
                  onChange={handleImageChange}
                  disabled={submitting}
                />
                {errors.image && (
                  <div className="invalid-feedback">{errors.image}</div>
                )}

                <input
                  type="text"
                  className={`form-control mb-3 ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  name="name"
                  placeholder="Ürün Adı"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}

                <input
                  type="number"
                  className={`form-control mb-3 ${
                    errors.price ? "is-invalid" : ""
                  }`}
                  name="price"
                  placeholder="Ürün Fiyatı"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}

                <textarea
                  className={`form-control mb-3 ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  name="description"
                  placeholder="Ürün Açıklaması"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  disabled={submitting}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={submitting}
                >
                  İptal
                </button>
                <button
                  className="btn btn-primary"
                  onClick={isEditMode ? handleUpdateProduct : handleAddProduct}
                  disabled={submitting}
                >
                  {submitting && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                  )}
                  {isEditMode ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "40vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center mt-5">
          <img
            src="/images/noCoffee.png"
            className="noCoffee"
            alt="no coffee"
          />
          <p className="mt-3">Daha önce eklenmiş ürün yok ☕️ </p>
        </div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <img
                src={product.imagePreview || product.image}
                alt={product.name}
                className="product-image"
              />
              <span className="product-name">{product.name}</span>
              <div className="button-group">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(product)}
                >
                  <FiEdit className="me-1" /> Düzenle
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product._id)}
                >
                  <FiTrash className="me-1" /> Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
