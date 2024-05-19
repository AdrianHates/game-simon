import { useEffect, useState } from "react";
import "./App.css";
import cueva from "./assets/music/cueva.mp3";
import loseMusic from "./assets/music/derrota.mp3";
import useAnimationBGI from "./CustomHooks/useAnimationBGI";
import Modal from "./components/modal";

const casillas = [
  {
    name: 1,
    audio: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    top: "110px",
    width: "124px",
    height: "124px",
    left: "82.5px  ",
    backgroundPositionX: 0,
    backgroundPositionY: 68,
    phase: 121.5,
  },
  {
    name: 2,
    audio: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    top: "20px",
    width: "155px",
    height: "127px",
    left: "260px",
    backgroundPositionX: 122,
    backgroundPositionY: 63,
    phase: 126,
  },
  {
    name: 3,
    audio: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    top: "105px",
    width: "135px",
    height: "158px",
    left: "457px",
    backgroundPositionX: 275,
    backgroundPositionY: 32,
    phase: 158,
  },
  {
    name: 4,
    audio: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    top: "210px",
    width: "175px",
    height: "117px",
    left: "240px",
    backgroundPositionX: 407,
    backgroundPositionY: 73,
    phase: 117,
  },
];

const TURNO = {
  1: 1,
  0: 0,
};

function App() {
  const [prueba, setPrueba] = useState([]);
  const [activo, setActivo] = useState(null);
  const [cantidad] = useState(4);
  const [check, setCheck] = useState(0);
  const [turno, setTurno] = useState(null);
  const [isOnRed, setIsOnRed] = useState(0);
  const [on, setOn] = useState(true);
  const [gameOver, setGameOver] = useState(false)
  const { result } = useAnimationBGI(36, 2, 0);
  const randomNumber = () => {
    const numero = Math.floor(Math.random() * cantidad);
    return numero;
  };

  const methodSequence = (indice) => {
    setActivo(indice);
    document.querySelector(`#audio-${indice}`)?.play();
  };

  const verificarSecuencia = (event) => {
    if (turno === TURNO[1] || turno === null) return;
    const seleccionado = Number(event.currentTarget.dataset.id);
    if (seleccionado !== prueba[check]) {
      musicStop();
      derrota();
      setGameOver(true)
      setPrueba([]);
      setActivo(null);
      setCheck(0);
      setTurno(null);
      return;
    }
    setActivo(seleccionado);
    event.currentTarget.querySelector("audio").play();
    if (check >= prueba.length - 1) {
      setCheck(0);
      setTimeout(() => {
        setTurno(TURNO[1]);
      }, 1500);
      return;
    }
    setCheck((prevState) => prevState + 1);
    setOn(false);
    setTimeout(() => {
      setActivo(null);
      setOn(true);
    }, 1500);
  };

  useEffect(() => {
    setTimeout(() => {
      if (turno === TURNO[1]) {
        const nuevoNumero = randomNumber();
        const newTabla = [...prueba].concat(nuevoNumero);
        setPrueba(newTabla);
        let count = 0;
        const intervalID = () => {
          methodSequence(newTabla[count]);

          count++;
          setTimeout(() => {
            setActivo(null);
          }, 2000);
          if (count - 1 < newTabla.length) {
            setTimeout(intervalID, 2500);
          } else {
            setTurno(TURNO[0]);
          }
        };
        intervalID();
      }
    }, 1000);
  }, [turno]);

  useEffect(() => {
    setTimeout(() => {
      if (isOnRed === 0) {
        setIsOnRed(1);
      }
    }, 1000);
  }, [isOnRed]);

  const musicPlay = () => {
    const music = document.querySelector("#audio");
    music.play();
  };

  const musicStop = () => {
    const music = document.querySelector("#audio");
    music.pause();
    music.currentTime = 0;
  };

  const derrota = () => {
    const lose = document.querySelector("#derrota");
    lose.play();
  };
  return (
    <div id="app">
      <h1>Changomon</h1>
      <h3>State:</h3>
      <p
        style={{
          fontWeight: "1000",
          color: `${
            turno === 1 ? "#d0e8ea" : turno === 0 ? "#ec202d" : "gray"
          }`,
        }}
      >
        {turno === 1
          ? "Sequence"
          : turno === 0
          ? "Press the button"
          : "Off"}
      </p>

      <div>
        {casillas.map((x, i) => (
          <div
            key={i}
            onClick={verificarSecuencia}
            disabled={on ? false : true}
            data-id={`${i}`}
            style={{
              top: x.top,
              left: x.left,
              width: x.width,
              height: x.height,
              backgroundPosition: `-${x.backgroundPositionX}px -${
                x.backgroundPositionY + (activo === i ? x.phase : 0)
              }px`,
            }}
          >
            <audio id={`audio-${i}`} src={x.audio} />
          </div>
        ))}
      </div>

      <div
        id="personaje"
        style={{
          backgroundPosition: `-1px -${2 + (turno === null ? 0 : result)}px`,
        }}
      />
      {/*Audio*/}
      <div>
        <audio id="audio" src={cueva} loop />
        <audio id="derrota" src={loseMusic} />
      </div>
      {turno === null && (
        <Modal>
          {
            gameOver && <img src='game-simon/game-over.png'/>
          }
          <button
          disabled={prueba.length === 0 ? false : true}
          onClick={() => {
            musicPlay();
            setTurno(TURNO[1]);
          }}
        >
          Start!
        </button>
        </Modal>
      )}
    </div>
  );
}

export default App;
