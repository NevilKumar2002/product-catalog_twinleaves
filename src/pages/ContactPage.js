import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ContactPage = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>Contact Us</Typography>
                <Typography variant="body1">
                    For any inquiries, please contact us at support@example.com.
                </Typography>
            </Box>
        </Container>
    );
};

export default ContactPage;
