import React, { useState, useEffect } from "react";
import "./scss/main.css";

import Data from "./Data";

const App = () => {
  const [state, setState] = useState({
    tab: Object.keys(Data)[0],
    unit1: null,
    unit2: null,
    input: 0,
    output: 0
  });

  useEffect(() => {
    setState({
      ...state,
      unit1: Data[state.tab][0].name,
      unit2: Data[state.tab][1].name
    });
    // eslint-disable-next-line
  }, [state.tab]);

  useEffect(() => {
    if (typeof state.unit1 === "string" && typeof state.unit2 === "string") {
      updateState(state.input);
    }
    // eslint-disable-next-line
  }, [state.unit1, state.unit2]);

  function updateState(value) {
    const val1 =
      Data[state.tab].find(measure => measure.name === state.unit1).value *
      1000;
    const val2 =
      Data[state.tab].find(measure => measure.name === state.unit2).value *
      1000;

    setState({
      ...state,
      input: value,
      output: (value * val1) / val2
    });
  }

  function swap() {
    setState({
      ...state,
      unit1: state.unit2,
      unit2: state.unit1
    });
  }

  return (
    <div className="App">
      <div className="Units">
        {Object.keys(Data).map(measure => (
          <button
            key={measure}
            onClick={e => setState({ ...state, tab: e.target.innerHTML })}
            className={state.tab === measure ? "active" : ""}
          >
            {measure}
          </button>
        ))}
      </div>
      <div className="List-of-units">
        <section>
          {Data[state.tab].map(measure => (
            <button
              key={measure.name}
              onClick={e =>
                setState({
                  ...state,
                  unit1: measure.name
                })
              }
              className={state.unit1 === measure.name ? "active" : ""}
            >
              {measure.name}
            </button>
          ))}
        </section>
        <section>
          {Data[state.tab].map(measure => (
            <button
              key={measure.name}
              onClick={e =>
                setState({
                  ...state,
                  unit2: measure.name
                })
              }
              className={state.unit2 === measure.name ? "active" : ""}
            >
              {measure.name}
            </button>
          ))}
        </section>
        <img
          src="swap.png"
          onClick={() => swap()}
          alt="swap"
          className="swap"
        />
      </div>
      <div className="Converter">
        <label>
          <p>{state.unit1}</p>
          <input
            type="number"
            className="input"
            value={state.input}
            onChange={e => updateState(e.target.value)}
          />
        </label>

        <label>
          <p>{state.unit2}</p>
          <input
            type="number"
            className="output"
            disabled
            value={state.output}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
