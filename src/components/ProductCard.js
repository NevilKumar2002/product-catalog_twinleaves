import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    
    // Retrieve existing cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add new item to cart
    const newCartItem = {
      ...product,
      quantity
    };

    // Update cart in localStorage
    toast.success('Product Added Sucessfully')
    localStorage.setItem('cart', JSON.stringify([...cart, newCartItem]));
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.sku_code}`);
  };

  return (
    <div className="product-card">
      <img src={product.image || 'default-image-url.jpg'} alt={product.name} className="product-image" onClick={handleViewDetails} />
      <h3 className="product-name">{product.name}</h3>
      <div className="product-details">
        <span className="product-price">₹{product.mrp.mrp}</span>
       <span> <LocalShippingIcon /> Standard Delivery</span>
        <div>9.00AM - 10.30PM</div>
        <div className='input-container'>
          QTY
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="quantity-input"
          />
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
