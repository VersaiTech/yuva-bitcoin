import React from 'react';
import PropTypes from 'prop-types';
import MainCard from './MainCard';
import { Typography, Button } from '@mui/material'; // Importing Typography and Button from @mui/material

const CryptoCard = ({ name, description, onClick }) => {
  return (
    <MainCard boxShadow>
      <Typography variant="h6"
sx={{ marginBottom: '0.5rem' }}>
        {name}
      </Typography>
      <Typography variant="body2"
sx={{ color: 'text.secondary', marginBottom: '1rem' }}>
        {description}
      </Typography>
      <Button onClick={onClick}
variant="contained"
color="primary"
fullWidth>
        View Listing
      </Button>
    </MainCard>
  );
};

CryptoCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CryptoCard;