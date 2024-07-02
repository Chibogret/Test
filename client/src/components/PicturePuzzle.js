import React, { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';

const PicturePuzzle = ({ imageSrc, gridSize = 4 }) => {
  const [tiles, setTiles] = useState([]);
  const [emptyTile, setEmptyTile] = useState({ row: gridSize - 1, col: gridSize - 1 });

  useEffect(() => {
    initializeTiles();
  }, []);

  const initializeTiles = () => {
    const newTiles = [];
    for (let row = 0; row < gridSize; row++) {
      const tileRow = [];
      for (let col = 0; col < gridSize; col++) {
        tileRow.push({ row, col, key: row * gridSize + col });
      }
      newTiles.push(tileRow);
    }
    newTiles[gridSize - 1][gridSize - 1] = null; // Empty tile
    const shuffledTiles = shuffleTiles(newTiles.flat()).reduce((acc, curr, idx) => {
      const rowIndex = Math.floor(idx / gridSize);
      if (!acc[rowIndex]) acc[rowIndex] = [];
      acc[rowIndex].push(curr);
      return acc;
    }, []);
    setTiles(shuffledTiles);
  };

  const shuffleTiles = (tiles) => {
    // Fisher-Yates shuffle
    for (let i = tiles.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    return tiles;
  };

  const handleTileClick = (row, col) => {
    if (canMoveTile(row, col)) {
      moveTile(row, col);
    }
  };

  const canMoveTile = (row, col) => {
    const { row: emptyRow, col: emptyCol } = emptyTile;
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const moveTile = (row, col) => {
    const newTiles = tiles.map(row => row.slice());
    newTiles[emptyTile.row][emptyTile.col] = newTiles[row][col];
    newTiles[row][col] = null;
    setTiles(newTiles);
    setEmptyTile({ row, col });
  };

  return (
    <Box>
      <Grid container spacing={0} gap={0} style={{ maxWidth: 400, margin: 'auto', overflow: "hidden" }}>
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Grid item xs={3} key={rowIndex * gridSize + colIndex} >
              {tile && (
                <Box
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${(tile.col / (gridSize - 1)) * 100}% ${(tile.row / (gridSize - 1)) * 100}%`,
                    border: '1px dashed black',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                />
              )}
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PicturePuzzle;
