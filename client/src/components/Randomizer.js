import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, Grow } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CasinoIcon from '@mui/icons-material/Casino';

const eateries = [
    "SEARCA",
    "MELVILLES",
    "R.M. CADAPAN CANTEEN",
    "KCW EATERY",
    "WE DELIVER",
    "CHIKIN",
    "CHICKENSEYO",
    "CANTINA IJA",
    "SEOUL KITCHEN",
    "ZOLLERS CUISINE",
    "ENTENGS",
    "FORWARD",
    "SELINAS",
    "JOLLIBEE",
    "MCDO",
    "PAPUS SIOMAI",
    "DIMSUM PANDA",
    "LA VILLE CANTEEN",
    "LE KATSU",
    "LA PPANG",
    "ELBI COMMONS",
    "EAT SUMO",
    "GOLDEN SPOON",
    "SWEET KEISH",
    "DRIP KOFI",
    "CHUBBY HABBIS",
    "TROPIC BOWLS",
    "7 11",
    "UNCLE JOHNS",
    "5 STAR CHICKEN",
    "CHOWKING",
    "BON CHON",
    "CAFE ELLA",
    "THE CRUNCH",
    "TAZA MIA",
    "ELBI COMMONS",
    "COMESHOTS",
    "ELBI BALAY",
    "KOREAN TOP CHEF",
    "BIG BELLYS",
    "CIRCULO",
    "SAMGYUPSALAMAT",
    "STABLE",
    "DANIELAS",
    "JOES INASAL",
    "JANGES",
    "THAI KITCHEN",
    "BURGARAGE",
    "TESS AND ELOYS",
    "MEISTERS",
    "NAMIS KITCHEN",
    "BLACK AND BREW",
    "AUNTIE PEARLS",
    "DALCIELO",
    "BURGER GARAGE",
    "PARDUCH",
    "PHUONGS VIETNAM",
    "ELLENS FRIED CHICKEN",
    "FLAMES",
    "IRRI",
    "WINGS AVE",
    "BONITOS",
    "CRAZY BABOY",
    "PABLOS BIRIYANI",
    "SIENTO",
    "CAFELANDIA",
    "KUSINA CATALAN"
  ];
  
  

const Randomizer = () => {
  const [coinResult, setCoinResult] = useState('');
  const [randomEatery, setRandomEatery] = useState('');
  const [coffeeDecision, setCoffeeDecision] = useState('');
  const [showCoinResult, setShowCoinResult] = useState(false);
  const [showEateryResult, setShowEateryResult] = useState(false);
  const [showCoffeeResult, setShowCoffeeResult] = useState(false);

  const flipCoin = () => {
    setCoinResult(Math.random() < 0.5 ? 'Heads' : 'Tails');
    setShowCoinResult(false);
    setTimeout(() => setShowCoinResult(true), 200);
  };

  const randomizeEatery = () => {
    const randomIndex = Math.floor(Math.random() * eateries.length);
    setRandomEatery(eateries[randomIndex]);
    setShowEateryResult(false);
    setTimeout(() => setShowEateryResult(true), 200);
  };

  const decideCoffee = () => {
    setCoffeeDecision(Math.random() < 0.3 ? 'Yes' : 'No');
    setShowCoffeeResult(false);
    setTimeout(() => setShowCoffeeResult(true), 200);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#ffe4e1' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#d2691e' }}>
                <CasinoIcon sx={{ mr: 1 }} />
                Flip a Coin
              </Typography>
              <Grow in={showCoinResult}>
                <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#d2691e' }}>
                  {coinResult}
                </Typography>
              </Grow>
              <Button variant="contained" sx={{ mt: 1, backgroundColor: '#ffb6c1', color: '#fff' }} onClick={flipCoin}>
                Flip
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#e0ffff' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#4682b4' }}>
                <RestaurantIcon sx={{ mr: 1 }} />
                Where to Eat
              </Typography>
              <Grow in={showEateryResult}>
                <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#4682b4' }}>
                  {randomEatery}
                </Typography>
              </Grow>
              <Button variant="contained" sx={{ mt: 1, backgroundColor: '#afeeee', color: '#fff' }} onClick={randomizeEatery}>
                Randomize
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#fffacd' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#daa520' }}>
                <CoffeeIcon sx={{ mr: 1 }} />
                Should I Buy Coffee?
              </Typography>
              <Grow in={showCoffeeResult}>
                <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#daa520' }}>
                  {coffeeDecision}
                </Typography>
              </Grow>
              <Button variant="contained" sx={{ mt: 1, backgroundColor: '#f0e68c', color: '#fff' }} onClick={decideCoffee}>
                Decide
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Randomizer;
