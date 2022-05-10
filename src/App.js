import { useReducer, useState, useRef, useEffect } from 'react'

import './App.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'floorArea':
      return { ...state, floorArea: action.payload.floorArea }
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
  floorArea: '',
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
  
  const [newLayer, setNewLayer] = useState('')
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


  return (
    <div className="App">
      <h1>Heat load calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>floor area:</span>
          <input 
            type='number'
            onChange={e => dispatch({ type: 'floorArea', payload: { floorArea: e.target.value }})}
            value={state.floorArea}
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
            <option value='8.66' selected>Brick</option>
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
    </div>
  )
}
