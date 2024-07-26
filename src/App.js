import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import { Container } from '@mui/material';
import './index.css';
import CartPage from './components/CartPage';

const App = () => {
  return (
    <Router>
      <div className="header">
        <h1 style={{textAlign:'center'}}>Product Catalog</h1>
      </div>
      <Container className="container">
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/product/:sku_code" element={<ProductDetails />} />
          <Route path="/watchlist" element={<CartPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
