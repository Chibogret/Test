// src/components/HeartsBackground.js
import React from 'react';
import { styled, keyframes } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Define the beating animation
const beat = keyframes`
    0%, 100% {
        transform: scale(1) rotate(var(--rotation));
    }
    50% {
        transform: scale(1.2) rotate(var(--rotation));
    }
`;

// Define the random movement animation
const move = keyframes`
    0% {
        transform: translate(0, 0) rotate(var(--rotation));
    }
    100% {
        transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotation));
    }
`;

const HeartsContainer = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: -1, // Ensure it is behind other content
}));

const Heart = styled(FavoriteIcon)(({ top, left, rotation, translateX, translateY }) => ({
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    transform: `rotate(${rotation}deg)`,
    '--rotation': `${rotation}deg`, // Custom property for rotation
    '--translateX': `${translateX}px`, // Custom property for translation
    '--translateY': `${translateY}px`, // Custom property for translation
    color: 'white', // Red color for the hearts
    fontSize: '5rem',
    animation: `${beat} 1s infinite, ${move} 5s infinite alternate`, // Apply the beating and movement animations
}));

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const HeartsBackground = ({ n }) => {
    const hearts = Array.from({ length: n }, (_, index) => ({
        id: index,
        top: getRandomInt(0, 100),
        left: getRandomInt(0, 100),
        rotation: getRandomInt(0, 360),
        translateX: getRandomInt(-50, 50), // Random translation values
        translateY: getRandomInt(-50, 50), // Random translation values
    }));

    return (
        <HeartsContainer>
            {hearts.map(({ id, top, left, rotation, translateX, translateY }) => (
                <Heart
                    key={id}
                    top={top}
                    left={left}
                    rotation={rotation}
                    translateX={translateX}
                    translateY={translateY}
                />
            ))}
        </HeartsContainer>
    );
};

export default HeartsBackground;
