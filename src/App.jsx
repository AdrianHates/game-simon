import { useEffect, useState } from 'react'
import './App.css'
import crystal from './assets/crystal.png'
import cueva from './assets/music/cueva.mp3'
import loseMusic from './assets/music/derrota.mp3'

const casillas = [{
  name: 1,
  audio: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
}, {
  name: 2,
  audio: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'
}, {
  name: 3,
  audio: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'
}, {
  name: 4,
  audio: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
}]

const TURNO = {
  1: 1,
  0: 0
}

function App() {
const [prueba, setPrueba] = useState([])
const [activo, setActivo] = useState(null)
const [cantidad, setCantidad] = useState(4)
const [check, setCheck] = useState(0)
const [turno, setTurno] = useState(null)
const [on, setOn] = useState(true)

  const randomNumber = () => {
    const numero = Math.floor(Math.random() * cantidad)
    return numero
  }

  const methodSequence = (indice) => {
    setActivo(indice)
    
      document.querySelector(`#audio-${indice}`)?.play()
    
  }

  const verificarSecuencia = (event) => {
    
    if(turno===TURNO[1] || turno === null) return
    const seleccionado = Number(event.currentTarget.dataset.id)
    if(seleccionado !== prueba[check]) {
      musicStop()
      derrota()
      alert('perdiste pe causa')
      setPrueba([])
      setActivo(null)
      setCheck(0)
      setTurno(null)
      return
    }
    setActivo(seleccionado)
    event.currentTarget.querySelector('audio').play()
    if(check >= prueba.length-1) {
      setCheck(0)
      setTimeout(() => {
        setTurno(TURNO[1])
      }, 1500)
      return
    }
    setCheck(prevState => prevState + 1)
    setOn(false)
    setTimeout(() => {
      setActivo(null)
      setOn(true)
    }, 1500)
    
  }
  
 useEffect(() => {
  setTimeout(() => {
  if(turno === TURNO[1]) {
    const nuevoNumero = randomNumber()
    const newTabla = [...prueba].concat(nuevoNumero)
    setPrueba(newTabla)
    let count = 0;
    const intervalID = () => {
      methodSequence(newTabla[count])
      
      count++
      setTimeout(() => {
        setActivo(null)
      }, 2000)
      if(count - 1 < newTabla.length) {
        setTimeout(intervalID, 2500)

      } else {
        setTurno(TURNO[0])

      }
    }
    intervalID()
    
  }
}, 1000)
 }, [turno])

 const musicPlay = () => {
  const music = document.querySelector('#audio')
  music.play()
 }

 const musicStop= () => {
  const music = document.querySelector('#audio')
  music.pause();
  music.currentTime = 0
 }

const derrota = () => {
  const lose = document.querySelector('#derrota')
  lose.play()
}
console.log(turno)
  return (
    <div id='app'>
      <h1>Changomon</h1>
      <h3>Estado:</h3>
      <p style={{fontWeight: '1000', fontSize:'1.5rem', color: `${turno===1?'skyblue':(turno===0?'#50C878':'gray')}`}}>{turno===1?'Secuencia':(turno===0?'Presiona la secuencia': 'Off')}</p>

      <div>
        { 
          casillas.map((x,i) =>  <button key={i} onClick= {verificarSecuencia} disabled={on?false:true} data-id={`${i}`} className={`opcion-${x.name} ${activo===i?'activo':''}`}>        
              <img alt='personaje' src={crystal} />
              <audio id={`audio-${i}`} src={x.audio} />

            </button>
          
          )
        }
      </div>
      {/* Div del personaje en movimiento */}
      <div id='personaje' className={turno===null?'movimiento':''} >
      

      </div>
      {/*Audio*/}
      <div>
        <audio id='audio' src={cueva} loop />
        <audio id='derrota' src={loseMusic} />
      </div>
      <button disabled={prueba.length===0?false:true} onClick={() => {
        musicPlay()
        setTurno(TURNO[1])
      }}>Start!</button>
      
    </div>
  )
}

export default App