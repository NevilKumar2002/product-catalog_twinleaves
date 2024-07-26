import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false); // State to track if product is in cart
  const { sku_code } = useParams(); // Get SKU code from URL

  const apiUrl = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.products || !Array.isArray(result.products)) {
          throw new Error('Invalid data format');
        }

        const product = result.products.find(product => product.sku_code === sku_code);
        console.log('product', product);
        setData(product);

        // Check if product is already in cart
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = cart.some(item => item.sku_code === sku_code);
        setInCart(isInCart);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sku_code]);

  const handleAddToCart = () => {
    if (data) {
      // Retrieve existing cart items from localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if product is already in cart
      const isInCart = cart.some(item => item.sku_code === data.sku_code);
      if (isInCart) {
        toast.error('Product is already in your cart!');
        return;
      }

      // Add new item to cart
      const newCartItem = {
        ...data,
        quantity: 1 // Default quantity; you can adjust this as needed
      };

      // Update cart in localStorage
      localStorage.setItem('cart', JSON.stringify([...cart, newCartItem]));

      toast.success('Product has been added to your cart!');
      setInCart(true); // Update state to reflect that product is now in cart
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No product found</div>;

  return (
    <div className="product-details">
      <div className="product-images">
        <img src={data.images.front} alt={data.name} className="main-image" />
        <div className="thumbnail-images">
          {data.images.back && <img src={data.images.back} alt={`${data.name} back`} />}
          {data.images.top && <img src={data.images.top} alt={`${data.name} top`} />}
          {data.images.bottom && <img src={data.images.bottom} alt={`${data.name} bottom`} />}
        </div>
      </div>
      <div className="product-info">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <p className="price">Price: ₹{data.mrp.mrp} {data.mrp.currency}</p>
        <p>Brand: {data.brand}</p>
        <p>Category: {data.main_category}</p>
        <p>Sub-Category: {data.category_level_1}</p>
        <p>Net Weight: {data.weights_and_measures.net_weight} {data.weights_and_measures.measurement_unit}</p>
        <p>Packaging Type: {data.packaging_type}</p>
        <p>Direction on How to Use: {data.attributes.direction_how_to_use}</p>
        <button 
          className="cart-button" 
          onClick={handleAddToCart}
          disabled={inCart} // Disable button if inCart is true
        >
          <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M7 4v1h10V4H7zm0 5v1h10V9H7zm0 5v1h10v-1H7zm14-5h-2.15l-1.64-5.11A1.003 1.003 0 0 0 16.56 4H5.44c-.42 0-.79.27-.93.67L2.87 8H.5c-.28 0-.5.22-.5.5s.22.5.5.5h2.03l1.54 4.59c.09.28.34.49.63.49H18c.29 0 .54-.21.63-.49l1.54-4.59h2.03c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zm-6.18 7H5.18c-.46 0-.86-.39-.86-.86s.39-.86.86-.86.86.39.86.86-.39.86-.86.86zm6.54 0h-5.54c-.46 0-.86-.39-.86-.86s.39-.86.86-.86.86.39.86.86-.39.86-.86.86z"/>
          </svg>
          <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
