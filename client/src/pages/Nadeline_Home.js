// src/pages/Nadeline_Home.js
import React, { useState } from 'react';
import { Container, Box, Typography, IconButton, Grid, Divider } from '@mui/material';
import Messages from '../components/Messages';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system';
import Navbar from '../components/Navbar';
import PicturePuzzle from '../components/PicturePuzzle';
import HeartsBackground from '../components/HeartsBackground';
import Games from '../components/Games';
import styles from '../styles.module.css'
import AnimatedText from '../components/AnimatedText';
import Horoscope from '../components/Horoscope';
import Countdown from '../components/Countdown';
import BucketList from '../components/BucketList';
import SliderMe from '../components/Slider';
import QuizSection from '../components/QuizSection';
import Randomizer from '../components/Randomizer';
import BucketListContainer from '../components/Bucket';
import MultiImageDisplay from '../components/MultiImageDisplay';


const useStyles = styled((theme) => ({
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
    },
}));

const imageUrls = [
    "/my-image.png",
    '/my-image (1).png',
    '/my-image (2).png',
    '/my-image (3).png',
    '/my-image (4).png',
    '/my-image (5).png',
    '/my-image (6).png',
  ];

function HomePage() {
    const classes = useStyles();
    const [open, set] = useState(true);

    return (
        <Box className="home">
            <Navbar />

            <Container className={classes.root} style={{ backgroundColor: "#FFD0D0", padding: "50px", margin: "0 auto", marginTop: "50px", marginBottom: "50px", paddingBottom: "50px", borderRadius: "50px" }}>
                <Box className={styles.container} onClick={() => set(state => !state)}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <AnimatedText />
                        </Grid>
                        <Grid item>
                            <Horoscope />
                        </Grid>
                    </Grid>
                </Box>
                <HeartsBackground n={50} />

                <Divider fullWidth style={{ color: "#A87676", margin: "25px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>Countdowns</Divider>
                <Countdown />
                <Divider fullWidth style={{ color: "#A87676", marginTop: "50px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>Bucket</Divider>
                <BucketListContainer/>
                <Divider fullWidth style={{ color: "#A87676", marginTop: "50px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>Messages</Divider>
                <Box style={{ textAlign: "center" }}>
                    <Messages />
                </Box>
                <Divider fullWidth style={{ color: "#A87676", marginTop: "50px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>Quick Question</Divider>
                <QuizSection />
                <Divider fullWidth style={{ color: "#A87676", marginTop: "50px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>The only feature we need</Divider>
                <Randomizer />
                <Divider fullWidth style={{ color: "#A87676", marginTop: "50px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>Games</Divider>
                <Games />
                <Divider fullWidth style={{ color: "#A87676", marginTop: "50px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>Hug Me</Divider>
                <SliderMe />
                <Divider fullWidth style={{ color: "#A87676", marginTop: "50px", fontWeight: "bold", fontStyle: "italic", fontSize: "2rem" }}>Hug Me</Divider>
                <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">Cheatsheet</h1>

                <MultiImageDisplay images={imageUrls} />
                </div>
            </Container>
        </Box>
    );
}

export default HomePage;
