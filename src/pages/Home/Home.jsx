import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import ProductModal from "../../components/ProductModal/ProductModal.jsx";
import "./Home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const products = [
    {
      id: 1,
      name: "Filtre Kahve",
      price: 80,
      image: "/images/filterCoffee.png",
      description:
        "Lezzetli ve taze filtre kahve, sabahları enerji dolu bir başlangıç için ideal.",
    },
    {
      id: 2,
      name: "Türk Kahvesi",
      price: 50,
      image: "/images/turkishCoffee.png",
      description:
        "Geleneksel Türk kahvesi, yoğun aroması ve köpüğüyle mükemmel bir seçenek.",
    },
    {
      id: 3,
      name: "Espresso",
      price: 150,
      image: "/images/espresso.png",
      description:
        "Küçük ama güçlü, espresso kahvesi sevenler için ideal bir tercih.",
    },
  ];

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;

  return (
    <div className="home-container">
      <div className="row mb-4">
        <div className="col-12 col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-2 mt-2 mt-md-0">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Fiyat: Artan</option>
            <option value="desc">Fiyat: Azalan</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => openModal(product)}
          />
        ))}
      </div>

      {modalVisible && selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          quantity={quantity}
          totalPrice={totalPrice}
          increment={increment}
          decrement={decrement}
          closeModal={closeModal}
          setQuantity={setQuantity}
        />
      )}
    </div>
  );
};

export default Home;
