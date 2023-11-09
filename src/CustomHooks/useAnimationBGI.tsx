import { useState, useEffect } from "react";

const useAnimationBGI = ( multiplicador:number, count: number, initialState:number ) => {
  const [frameIndex, setFrameIndex] = useState(initialState)
  const frameCount = count
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevFrameIndex) => (prevFrameIndex + 1) % frameCount);
    }, 350); // Ajusta el intervalo de tiempo según la velocidad de la animación

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [frameIndex]);
  const result = frameIndex * multiplicador
  return { result }

}
export default useAnimationBGI;