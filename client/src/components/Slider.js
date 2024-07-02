import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';

const SliderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '80%',
  margin: 'auto',
  position: 'relative',
  height: '200px',
});

const Character = styled(Box)(({ left }) => ({
  position: 'absolute',
  left: `${left}%`,
  transition: 'left 0.5s ease',
  width: '10%', // Adjust as needed for image size
}));

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const SliderMe = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 100) {
      setOpen(true);
    }
  }, [value]);

  const handleClose = () => {
    setOpen(false);
    setValue(0);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <SliderContainer>
        <Character left={-4 + value * 0.45}>
          <img src="/dein.png" alt="Dein" style={{ width: '100%' }} />
        </Character>
        <Character left={93 - value * 0.45}>
          <img src="/nade.png" alt="Nade" style={{ width: '100%' }} />
        </Character>
      </SliderContainer>
      <Slider
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="love-slider"
        sx={{ mt: 10 }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={modalStyle}
      >
        <Box
          sx={{
            width: '80%',
            maxWidth: '500px',
            textAlign: 'center',
            background: 'white',
            p: 4,
            borderRadius: 1,
            boxShadow: 24,
            outline: 'none',
            animation: 'fadeIn 0.5s ease',
          }}
        >
          <img src="hug.gif" alt="Hug" style={{ width: '100%' }} />
        </Box>
      </Modal>
    </Box>
  );
};

export default SliderMe;
