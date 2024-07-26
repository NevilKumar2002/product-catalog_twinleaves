import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Container>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Product App
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
