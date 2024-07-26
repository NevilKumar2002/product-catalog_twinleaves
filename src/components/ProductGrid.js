import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import "./ProductGrid.css";
import { Container, Grid, TextField, CircularProgress, Box, Typography, Pagination, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const API_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalRows, setTotalRows] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'asc');
    const [view, setView] = useState('grid');

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL, {
            params: {
                page: page,
                size: pageSize,
            },
        }).then(response => {
            const { products, totalResults } = response.data;
            setProducts(products.map(product => ({
                id: product.sku_code || Date.now(),
                ...product,
                price: product.mrp.mrp,
                image: product.images.front,
            })));
            setTotalRows(parseInt(totalResults, 10));
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching products:', error);
            setLoading(false);
        });
    }, [page, pageSize]);

    useEffect(() => {
        let filtered = [...products];

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Filter by category
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        // Sort by price
        if (sortOrder === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    }, [products, searchQuery, category, sortOrder]);

    const handleSearch = () => {
        setSearchParams({ search: searchQuery, page: 1 });
        setPage(1); // Reset page to 1 on search
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setSearchParams({ category: event.target.value, page: 1 });
        setPage(1);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
        setSearchParams({ sort: event.target.value, page: 1 });
        setPage(1);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        setSearchParams({ ...searchParams, page: value });
    };

    const toggleView = () => {
        setView(view === 'grid' ? 'card' : 'grid');
    };

    return (
        <Container maxWidth="lg" className="product-grid-container">
            <Box my={4}>
                <Typography variant="h4" gutterBottom>Product Grid</Typography>

                <Box display="flex" alignItems="center" my={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        margin="normal"
                        className="search-field"
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSearch} 
                        style={{ marginLeft: '10px', height: '55px' }}
                    >
                        Search
                    </Button>
                </Box>

                <Box display="flex" justifyContent="space-between" my={2}>
                    <FormControl variant="outlined" className="filter-select">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            <MenuItem value="snacks & branded foods">Snacks & Branded Foods</MenuItem>
                            <MenuItem value="biscuits & cookies">Biscuits & Cookies</MenuItem>
                            <MenuItem value="beauty & hygiene">Beauty & Hygiene</MenuItem>
                            <MenuItem value="shampoo & conditioner">Shampoo & Conditioner</MenuItem>
                            <MenuItem value="baby bath & hygiene">Baby Bath & Hygiene</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" className="filter-select">
                        <InputLabel>Sort By Price</InputLabel>
                        <Select
                            value={sortOrder}
                            onChange={handleSortOrderChange}
                            label="Sort By Price"
                        >
                            <MenuItem value="asc">Price: Low to High</MenuItem>
                            <MenuItem value="desc">Price: High to Low</MenuItem>
                        </Select>
                    </FormControl>

                    {/* <Button variant="contained" onClick={toggleView} className="toggle-view-button">
                        {view === 'grid' ? 'Switch to Card View' : 'Switch to Grid View'}
                    </Button> */}
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={2} className={view === 'grid' ? 'grid-view' : 'card-view'}>
                            {filteredProducts.map(product => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                    <ProductCard product={product} view={view} />
                                </Grid>
                            ))}
                        </Grid>
                        <Box display="flex" justifyContent="center" my={4}>
                            <Pagination
                                count={Math.ceil(totalRows / pageSize)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </>
                )}
            </Box>
            <ToastContainer />
        </Container>
    );
};

export default ProductGrid;
