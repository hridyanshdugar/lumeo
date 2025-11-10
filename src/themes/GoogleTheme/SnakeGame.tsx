import React, { useState, useEffect } from 'react';

interface SnakeGameProps {
  darkMode?: boolean;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ darkMode = false }) => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState({ current: [0, 0], next: [0, 0] });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.preventDefault();

      if (!gameStarted) {
        setGameStarted(true);
      }

      setDirection(prev => {
        const [currentRow, currentCol] = prev.current;

        if (e.key === 'ArrowUp' && currentRow !== 1) {
          return { ...prev, next: [-1, 0] };
        }
        if (e.key === 'ArrowDown' && currentRow !== -1) {
          return { ...prev, next: [1, 0] };
        }
        if (e.key === 'ArrowLeft' && currentCol !== 1) {
          return { ...prev, next: [0, -1] };
        }
        if (e.key === 'ArrowRight' && currentCol !== -1) {
          return { ...prev, next: [0, 1] };
        }

        return prev;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const interval = setInterval(() => {
      setDirection(prev => {
        const currentDirection = prev.next;

        // Don't move if no direction set
        if (currentDirection[0] === 0 && currentDirection[1] === 0) {
          return prev;
        }

        setSnake(prevSnake => {
          const newHead = [
            prevSnake[0][0] + currentDirection[0],
            prevSnake[0][1] + currentDirection[1]
          ];

          // Check collision with walls
          if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20) {
            setGameOver(true);
            return prevSnake;
          }

          // Check collision with self
          if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
            setGameOver(true);
            return prevSnake;
          }

          const newSnake = [newHead, ...prevSnake];

          // Check if food is eaten
          if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setScore(s => s + 10);
            setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
          } else {
            newSnake.pop();
          }

          return newSnake;
        });

        return { current: currentDirection, next: currentDirection };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [food, gameOver, gameStarted]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className={`text-3xl font-light tracking-wide ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Snake
      </div>

      <div className={`inline-grid border shadow-sm ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'
      }`} style={{ gridTemplateColumns: 'repeat(20, 20px)' }}>
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => {
            const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
            const isFood = food[0] === row && food[1] === col;
            const isHead = snake.length > 0 && snake[0][0] === row && snake[0][1] === col;
            return (
              <div
                key={`${row}-${col}`}
                className={`w-5 h-5 ${
                  darkMode ? (
                    isHead ? 'bg-gray-100' :
                    isSnake ? 'bg-gray-400' :
                    isFood ? 'bg-gray-500' :
                    'bg-gray-800'
                  ) : (
                    isHead ? 'bg-gray-900' :
                    isSnake ? 'bg-gray-600' :
                    isFood ? 'bg-gray-400' :
                    'bg-white'
                  )
                }`}
              />
            );
          })
        )}
      </div>

      <div className="h-12 flex items-center justify-center">
        {!gameStarted && !gameOver && (
          <div className={`text-sm font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Press any arrow key to start
          </div>
        )}
        {gameOver && (
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Game Over • Score: {score}
          </div>
        )}
        {!gameOver && gameStarted && (
          <div className={`text-sm font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Score: {score}
          </div>
        )}
      </div>

      {gameOver && (
        <button
          onClick={() => {
            setSnake([[5, 5]]);
            setFood([10, 10]);
            setDirection({ current: [0, 0], next: [0, 0] });
            setGameOver(false);
            setGameStarted(false);
            setScore(0);
          }}
          className={`text-sm underline underline-offset-2 transition-colors font-light ${
            darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Play Again
        </button>
      )}
    </div>
  );
};
