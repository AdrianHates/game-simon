import React, { useEffect, useRef } from "react";

const ScoreBoard = ({ score }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const numberSprite = {
    0: {
      sx: 8,
    },
    1: {
      sx: 17,
    },
    2: {
      sx: 25,
    },
    3: {
      sx: 33,
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sprite = new Image();
    sprite.src = `${import.meta.env.BASE_URL}number-score.png`;

    sprite.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = 1;
      const sy = 16
      // Convertir el puntaje en un array de dígitos
      const scoreDigits = score.toString().padStart(2, '0').split("");
      const digitWidth = 7; // Ancho de cada número en el sprite
      const digitHeight = 8; // Alto de cada número en el sprite

      scoreDigits.forEach((digit, index) => {
        // Convertir el dígito en un número para seleccionar su posición en el sprite
        const digitIndex = parseInt(digit);

        // Dibujar el dígito en el canvas
        ctx.drawImage(
          sprite,
          digitIndex === 0 ? 8 : digitIndex * 8 + 9,
          sy,
          digitWidth,
          digitHeight, // sw, sh (ancho y alto del dígito)
          index * digitWidth * scale,
          0, // dx, dy (posición en el canvas)
          digitWidth * scale,
          digitHeight * scale // dw, dh (ancho y alto en el canvas)
        );
      });
    };
  }, [score]);
  return (
    <div className="scoreboard">
      <canvas ref={canvasRef} width="14" height="8"></canvas>
    </div>
  );
};

export default ScoreBoard;
