import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>404 - Page Not Found</Typography>
                <Typography variant="body1">
                    The page you're looking for does not exist.
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
