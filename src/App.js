import { useReducer, useState, useEffect } from "react";

import "./App.css";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

const formReducer = (state, action) => {
  switch (action.type) {
    case "floorLength":
      return { ...state, floorLength: action.payload.floorLength };
    case "floorWidth":
      return { ...state, floorWidth: action.payload.floorWidth };
    case "ceilingHeight":
      return { ...state, ceilingHeight: action.payload.ceilingHeight };
    case "wallLayers":
      return { ...state, wallLayers: action.payload.wallLayers };
    case "windowArea":
      return { ...state, windowArea: action.payload.windowArea };
    case "windowQty":
      return { ...state, windowQty: action.payload.windowQty };
    case "occupantQty":
      return { ...state, occupantQty: action.payload.occupantQty };
    case "outsideTemp":
      return { ...state, outsideTemp: action.payload.outsideTemp };
    case "insideTemp":
      return { ...state, insideTemp: action.payload.insideTemp };
    default:
      return state;
  }
};

let initalState = {
  floorLength: "",
  floorWidth: "",
  ceilingHeight: "",
  wallLayers: {},
  windowArea: "",
  windowQty: "",
  occupantQty: "",
  outsideTemp: "",
  insideTemp: "",
};

export default function App() {
  const [state, dispatch] = useReducer(formReducer, initalState);

  const [newLayer, setNewLayer] = useState("8.66");
  const [newThickness, setNewThickness] = useState("");
  const [wall, setWall] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [tonnage, setTonnage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTonnage();
    // console.log(`Total tonnage required: ${calculateTonnage()} TR`);
    // console.log(state);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setWall((prevState) => setWall({ ...prevState, [newLayer]: newThickness }));
    setNewLayer("");
    setNewThickness("");
  };

  useEffect(() => {
    dispatch({ type: "wallLayers", payload: { wallLayers: wall } });
  }, [wall]);

  const calculateTonnage = () => {
    setTonnage(Math.ceil(grandTotalHeatLoad() / 3.51 / 1000));
    // return grandTotalHeatLoad() / 3.51 / 1000;
  };

  const totalSensibleHeat = () => {
    return wallHeatLoad() + glassHeatLoad() + occupantHeatLoad();
  };

  const totalLatentHeat = () => {
    return occupantLatentHeatLoad();
  };

  const grandTotalHeatLoad = () => {
    return totalSensibleHeat() + totalLatentHeat();
  };

  const wallHeatLoad = () => {
    let result = 0;
    for (const key in state.wallLayers) {
      result += Number(state.wallLayers[key]) / Number(key);
    }
    result =
      result +
      1 / (Number(state.insideTemp) + 273) +
      1 / (Number(state.outsideTemp) + 273);
    result = 1 / result;
    const heatLoad =
      result *
      (2 * state.ceilingHeight * state.floorLength +
        2 * state.ceilingHeight * state.floorWidth) *
      (state.outsideTemp - state.insideTemp);
    return heatLoad;
  };

  const glassHeatLoad = () => {
    let result =
      0.01 / 0.7 +
      1 / (Number(state.insideTemp) + 273) +
      1 / (Number(state.outsideTemp) + 273);
    result = 1 / result;
    const heatLoad =
      result *
      (state.windowArea * state.windowQty) *
      (state.outsideTemp - state.insideTemp) *
      1.2;
    return heatLoad;
  };

  const occupantHeatLoad = () => {
    const heatLoad = state.occupantQty * 155;
    return heatLoad;
  };

  const occupantLatentHeatLoad = () => {
    const heatLoad = state.occupantQty * 72;
    return heatLoad;
  };

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
    setTonnage(null);
  };

  return (
    <div className="App">
      <header>
        <button onClick={handleModal}>How to use?</button>
        <p className="title">Heat Load Calculator</p>
      </header>
      <main>
        <p>Note: Length is in meters and temperature in ºC</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Floor Length:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "floorLength",
                  payload: { floorLength: e.target.value },
                })
              }
              value={state.floorLength}
              placeholder="E.g. 20"
              required
            />
          </label>

          <label>
            <span>Floor Width:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "floorWidth",
                  payload: { floorWidth: e.target.value },
                })
              }
              value={state.floorWidth}
              placeholder="E.g. 40"
              required
            />
          </label>

          <label>
            <span>Ceiling Height:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "ceilingHeight",
                  payload: { ceilingHeight: e.target.value },
                })
              }
              value={state.ceilingHeight}
              placeholder="E.g. 6"
              required
            />
          </label>

          <label>
            <span>Wall Layers:</span>
            <select
              onChange={(e) => setNewLayer(e.target.value)}
              value={newLayer}
              required
            >
              <option value="8.66">Brick</option>
              <option value="1.73">Concrete</option>
              <option value="8.65">Plaster</option>
              <option value="0.154">asbestos</option>
            </select>
            <input
              type="number"
              onChange={(e) => setNewThickness(e.target.value)}
              value={newThickness}
              placeholder="E.g. 0.1"
              // required
            />
            <button onClick={handleAdd} className="btn-add">
              Add
            </button>
          </label>

          <label>
            <span>Window Area:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "windowArea",
                  payload: { windowArea: e.target.value },
                })
              }
              value={state.windowArea}
              placeholder="E.g. 1"
              required
            />
          </label>

          <label>
            <span>Window Quantity:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "windowQty",
                  payload: { windowQty: e.target.value },
                })
              }
              value={state.windowQty}
              placeholder="E.g. 8"
              required
            />
          </label>

          <label>
            <span>Occupant Quantity:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "occupantQty",
                  payload: { occupantQty: e.target.value },
                })
              }
              value={state.occupantQty}
              placeholder="E.g. 15"
              required
            />
          </label>

          <label>
            <span>Outside Temperature:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "outsideTemp",
                  payload: { outsideTemp: e.target.value },
                })
              }
              value={state.outsideTemp}
              placeholder="E.g. 35"
              required
            />
          </label>

          <label>
            <span>Inside Temperature:</span>
            <input
              type="number"
              onChange={(e) =>
                dispatch({
                  type: "insideTemp",
                  payload: { insideTemp: e.target.value },
                })
              }
              value={state.insideTemp}
              placeholder="E.g. 22"
              required
            />
          </label>
          <button className="btn-calculate">Calculate</button>
        </form>
      </main>

      {showModal && (
        <Modal>
          <h2 style={{ textAlign: "center" }}>
            How to use Head Load Calculator
          </h2>
          <ol>
            <li>
              For each input (e.g. floor length), enter a numeric value{" "}
              <strong>in meters.</strong>
            </li>
            <li>
              For defining wall layers, select a layer type (e.g. Concrete), and
              define its thickness in meters and click 'Add'. Multiple wall
              layers can be added.
            </li>
            <li>
              Click 'Calculate' to find out the total AC Tonnage required for
              the specified room.
            </li>
          </ol>
          <button onClick={handleModal}>Continue</button>
        </Modal>
      )}

      {tonnage && (
        <Modal>
          <h2 style={{ textAlign: "center" }}>Total AC Tonnage Required</h2>
          <h3 style={{ textAlign: "center" }}>{tonnage} TR</h3>
          <button onClick={handleModal}>Continue</button>
        </Modal>
      )}

      <Footer />
    </div>
  );
}
