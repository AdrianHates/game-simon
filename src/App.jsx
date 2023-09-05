import { useEffect, useState } from 'react'
import './App.css'

const casillas = [1,2,3,4]
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
  }

  const verificarSecuencia = (event) => {
    if(turno===TURNO[1] || turno === null) return
    const seleccionado = Number(event.currentTarget.dataset.id)
    if(seleccionado !== prueba[check]) {
      alert('perdiste pe causa')
      setPrueba([])
      setActivo(null)
      setCheck(0)
      setTurno(null)
      return
    }
    setActivo(seleccionado)

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
  return (
    <div id='app'>
      <h1>Changomon</h1>
      <p>{`Estado: ${turno===1?'Secuencia':(turno===0?'Presiona la secuencia': 'Off')}`}</p>
      <div>
        {
          casillas.map( (x,i) => 
            <button onClick= {verificarSecuencia} disabled={on?false:true} data-id={`${i}`} key={i} className={`opcion-${x} ${activo===i?'activo':''}`}>        <img alt='personaje' src='/img/crystal.png' />
            </button>
          )
        }
      </div>
      
      <button disabled={prueba.length===0?false:true} onClick={() => {
        setTurno(TURNO[1])
      }}>Start!</button>
      
    </div>
  )
}

export default App