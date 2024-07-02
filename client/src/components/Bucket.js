import React from 'react';
import { Grid, Box } from '@mui/material';
import BucketList from './BucketList'; // Ensure the path is correct
import { styled, keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const useStyles = styled((theme) => ({
  bucketListContainer: {
    padding: theme.spacing(2),
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
  },
  heart: {
    fontSize: '5rem',
    color: theme.palette.error.main,
  },
  text: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  bucketListContainer: {
    maxHeight: '300px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    margin: '0 20px',
    animation: `${bounce} 2s infinite, ${rotate} 10s infinite`,
  },
}));

const BucketListContainer = () => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <img src={'nade.png'} alt="Nade" className={classes.image} />
      </Grid>
      <Grid item xs>
        <Box className={classes.bucketListContainer}>
          <BucketList />
        </Box>
      </Grid>
      <Grid item>
        <img src={'dein.png'} alt="Dein" className={classes.image} />
      </Grid>
    </Grid>
  );
};

export default BucketListContainer;
