import { useReducer, useState, useRef, useEffect } from 'react'

import './App.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'floorLength':
      return { ...state, floorLength: action.payload.floorLength }
    case 'floorWidth':
      return { ...state, floorWidth: action.payload.floorWidth }
    case 'ceilingHeight':
      return { ...state, ceilingHeight: action.payload.ceilingHeight }
    case 'wallLayers':
      return { ...state, wallLayers: action.payload.wallLayers }
    case 'windowArea':
      return { ...state, windowArea: action.payload.windowArea }
    case 'windowQty':
      return { ...state, windowQty: action.payload.windowQty }
    case 'occupantQty':
      return { ...state, occupantQty: action.payload.occupantQty }
    case 'outsideTemp':
      return { ...state, outsideTemp: action.payload.outsideTemp }
    case 'insideTemp':
      return { ...state, insideTemp: action.payload.insideTemp }
    default:
      return state
  }
}

let initalState = {
  floorLength: '',
  floorWidth: '',
  ceilingHeight: '',
  wallLayers: {},
  windowArea: '',
  windowQty: '',
  occupantQty: '',
  outsideTemp: '',
  insideTemp: ''
}

export default function App() {

  const [state, dispatch] = useReducer(formReducer, initalState)
  
  const [newLayer, setNewLayer] = useState('8.66')
  const [newThickness, setNewThickness] = useState('')
  const [wall, setWall] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    setWall(prevState => setWall({ ...prevState, [newLayer]: newThickness }))
    setNewLayer('')
    setNewThickness('')
  }

  useEffect(() => {
    dispatch({ type: 'wallLayers', payload: { wallLayers: wall }})
  }, [wall])

  const wallHeatLoad = () => {
    let result = 0
    for (const key in state.wallLayers) {
      result += Number(state.wallLayers[key])/Number(key)
    }
    result = result + (1 / (Number(state.insideTemp) + 273)) + (1 / (Number(state.outsideTemp) + 273))
    result = 1 / result
    const heatLoad = result * ((2 * state.ceilingHeight * state.floorLength) + (2 * state.ceilingHeight * state.floorWidth)) * (state.outsideTemp - state.insideTemp)
    console.log(heatLoad)
  }

  const glassHeatLoad = () => {
    let result = 0
    for (const key in state.wallLayers) {
      result += Number(state.wallLayers[key])/Number(key)
    }
    result = result + (1 / (Number(state.insideTemp) + 273)) + (1 / (Number(state.outsideTemp) + 273))
    result = 1 / result
    const heatLoad = result * ((2 * state.ceilingHeight * state.floorLength) + (2 * state.ceilingHeight * state.floorWidth)) * (state.outsideTemp - state.insideTemp)
    console.log(heatLoad)
  }

  return (
    <div className="App">
      <h1>Heat load calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>floor length:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'floorLength', payload: { floorLength: e.target.value }})}
            value={state.floorLength}
            required
          />
        </label>

        <label>
          <span>floor width:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'floorWidth', payload: { floorWidth: e.target.value }})}
            value={state.floorWidth}
            required
          />
        </label>

        <label>
          <span>ceiling height:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'ceilingHeight', payload: { ceilingHeight: e.target.value }})}
            value={state.ceilingHeight}
            required
          />
        </label>

        <label>
          <span>wall layers:</span>
          <select
            onChange={e => setNewLayer(e.target.value)}
            value={newLayer}
            required
          >
            <option value='8.66'>Brick</option>
            <option value='1.73'>Concrete</option>
            <option value='8.65'>Plaster</option>
            <option value='0.154'>asbestos</option>
          </select>
          <input 
            type='number'
            onChange={e => setNewThickness(e.target.value)}
            value={newThickness}
            // required
          />
          <button onClick={handleAdd}>add</button>
        </label>

        <label>
          <span>window area:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'windowArea', payload: { windowArea: e.target.value }})}
            value={state.windowArea}
            required
          />
        </label>

        <label>
          <span>window quantity:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'windowQty', payload: { windowQty: e.target.value }})}
            value={state.windowQty}
            required
          />
        </label>

        <label>
          <span>occupant quantity:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'occupantQty', payload: { occupantQty: e.target.value }})}
            value={state.occupantQty}
            required
          />
        </label>

        <label>
          <span>outside temperature:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'outsideTemp', payload: { outsideTemp: e.target.value }})}
            value={state.outsideTemp}
            required
          />
        </label>

        <label>
          <span>inside temperature:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'insideTemp', payload: { insideTemp: e.target.value }})}
            value={state.insideTemp}
            required
          />
        </label>
        <button>submit</button>
      </form>

      <button onClick={wallHeatLoad}>click me</button>
    </div>
  )
}
