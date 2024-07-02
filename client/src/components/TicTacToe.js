import React, { useState } from 'react';
import { Box, Button, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // X icon
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; // O icon
import ReplayIcon from '@mui/icons-material/Replay'; // Reset icon

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <Button 
      variant="outlined" 
      onClick={() => handleClick(index)}
      sx={{ width: 100, height: 100, fontSize: '2rem', borderColor: "teal" }}
    >
      {board[index] === 'X' && <CloseIcon sx={{ color: 'red', fontSize: '6rem' }} />}
      {board[index] === 'O' && <RadioButtonUncheckedIcon sx={{ color: 'teal', fontSize: '6rem' }} />}
    </Button>
  );

  const getPlayerIcon = (player) => {
    if (player === 'X') {
      return <CloseIcon sx={{ color: 'red', fontSize: '2rem', verticalAlign: 'middle' }} />;
    } else if (player === 'O') {
      return <RadioButtonUncheckedIcon sx={{ color: 'teal', fontSize: '2rem', verticalAlign: 'middle' }} />;
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? (
    <>
      {getPlayerIcon(winner)}
    </>
  ) : (
    <>
      {getPlayerIcon(isXNext ? 'X' : 'O')}
    </>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 300, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          {status}
        </Typography>
        <IconButton onClick={resetGame}>
          <ReplayIcon />
        </IconButton>
      </Box>
      <Grid container spacing={1} justifyContent="center">
        {[0, 1, 2].map(row => (
          <Grid container item spacing={1} key={row} justifyContent="center">
            {[0, 1, 2].map(col => (
              <Grid item key={col}>
                {renderSquare(row * 3 + col)}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
