import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentProduct({ ...currentProduct, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!currentProduct.name || !currentProduct.price || !currentProduct.description || !currentProduct.image) return;
    const newProduct = {
      ...currentProduct,
      id: Date.now(),
    };
    setProducts([...products, newProduct]);
    setShowModal(false);
    resetForm();
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setCurrentProduct({ id: null, name: "", price: "", description: "", image: "" });
    setIsEditMode(false);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Ürün Yönetimi</h2>
      <button className="btn btn-success mb-4" onClick={() => setShowModal(true)}>
        <FiPlus className="me-2" /> Ürün Ekle
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header mb-4">
                <h5 className="modal-title">{isEditMode ? "Ürün Güncelle" : "Ürün Ekle"}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowModal(false); resetForm(); }}></button>
              </div>
              <div className="modal-body">
                {currentProduct.image && (
                  <div className="text-center mb-3">
                    <img src={currentProduct.image} alt="preview" style={{ maxHeight: "200px" }} className="img-thumbnail" />
                  </div>
                )}
                <input type="file" accept="image/*" className="form-control mb-3" onChange={handleImageChange} />
                <input type="text" className="form-control mb-3" name="name" placeholder="Ürün Adı" value={currentProduct.name} onChange={handleInputChange} />
                <input type="number" className="form-control mb-3" name="price" placeholder="Ürün Fiyatı" value={currentProduct.price} onChange={handleInputChange} />
                <textarea className="form-control mb-3" name="description" placeholder="Ürün Açıklaması" value={currentProduct.description} onChange={handleInputChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary me-2" onClick={() => { setShowModal(false); resetForm(); }}>İptal</button>
                <button className="btn btn-primary" onClick={isEditMode ? handleUpdateProduct : handleAddProduct}>
                  {isEditMode ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center mt-5">
          <img src="/images/noCoffee.png" className="noCoffee"/>
          <p className="mt-3">Daha önce eklenmiş ürün yok ☕️ </p>
        </div>
      ) : (
        <div className="product-list">
          {products.map(product => (
            <div className="product-item" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <span className="product-name">{product.name}</span>
              <div className="button-group">
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                  <FiEdit className="me-1" /> Düzenle
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
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
