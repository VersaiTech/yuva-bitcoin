import { useState } from 'react';
import { Box, Button, Card, CardActions, Divider, Stack, Typography, Modal, TextField } from '@mui/material';
import axios from 'axios';

const CoinValueSettingsPage = () => {
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(0.1);
  const [minAmount, setMinAmount] = useState(100);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeValue = async () => {
    try {
      const response = await axios.post('/api/update-coin-value', {
        currentValue,
        minAmount,
      });
      console.log('Value updated successfully', response.data);
      handleClose();
    } catch (error) {
      console.error('Error updating value', error);
    }
  };

  return (
    <Card>
      <Typography variant="h5" align="center">
        set market place coin value
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={3}
        sx={{ px: 4, py: 3 }}
      >
        <Box>
          <Typography variant="subtitle1" align="center">current value</Typography>
          <Typography variant="h4" align="center">{currentValue}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" align="center">minimum amount</Typography>
          <Typography variant="h4" align="center">{minAmount}</Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleOpen} variant="contained" sx={{ backgroundColor: '#d5e8d4', color: 'black' }}>
          set value
        </Button>
      </CardActions>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" align="center">Change Values</Typography>
          <Stack spacing={3} sx={{ mt: 3 }}>
            <TextField
              label="Current Value"
              type="number"
              fullWidth
              value={currentValue}
              onChange={(e) => setCurrentValue(parseFloat(e.target.value))}
            />
            <TextField
              label="Minimum Amount"
              type="number"
              fullWidth
              value={minAmount}
              onChange={(e) => setMinAmount(parseInt(e.target.value, 10))}
            />
            <Button onClick={handleChangeValue} variant="contained">Change Value</Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
};

export default CoinValueSettingsPage;
