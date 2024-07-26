import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
       
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartData);
    }, []);

    const handleRemoveFromCart = (sku_code) => {
        const updatedCartItems = cartItems.filter(item => item.sku_code !== sku_code);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    return (
        <Container maxWidth="lg" className="cart-page-container">
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            {cartItems.length === 0 ? (
                <Typography variant="h6">Your cart is empty.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {cartItems.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.sku_code}>
                            <Card className="cart-item-card">
                                <CardMedia
                                    component="img"
                                    alt={item.name}
                                    height="140"
                                    image={item.image}
                                    title={item.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ${item.price}
                                    </Typography>
                                    <Box mt={2} display="flex" justifyContent="space-between">
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={() => handleRemoveFromCart(item.sku_code)}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CartPage;
