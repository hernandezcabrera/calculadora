import "./App.css";
import React, { useState } from "react";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [result, setResult] = useState(0);

  let initialState = JSON.parse(localStorage.getItem("historial")) || [];
  const [historial, sethistorial] = useState(initialState);

  const handleborrar=()=>{
    sethistorial([])
    localStorage.setItem("operaciones",JSON.stringify([]));
  }

  function allClear() {
    setNumber1("");
    setNumber2("");
    setCurrentOperation("");
    setResult(0);
  }

  const deleteNumber = () => {
    if (currentOperation === "") {
      setNumber1(number1.toString().slice(0, -1));
    } else {
      setNumber2(number2.toString().slice(0, -1));
    }
  };

  function clickNumber(val) {
    if (currentOperation === "") {
      setNumber1(number1 + val);
    } else {
      setNumber2(number2 + val);
    }
  }

  function clickOperation(val) {
    setCurrentOperation(val);
  }

  function getResult(val) {
    let resultado = 0;
    switch (currentOperation) {
      case "+":
        resultado = Number(number1) + Number(number2);
        break;
      case "-":
        resultado = Number(number1) - Number(number2);
        break;
      case "*":
        resultado = Number(number1) * Number(number2);
        break;
      case "/":
        resultado = Number(number1) / Number(number2);
        break;
      default:
        break;
    }

    setResult(resultado);
    const coleccion = {
      n1: number1,
      ope: currentOperation,
      n2: number2,
      res: resultado,
    };
    console.log({ resultado });
    console.log({ coleccion });
    const nuevoArray = [...historial, coleccion];
    sethistorial([...nuevoArray]);
    localStorage.setItem("historial", JSON.stringify(nuevoArray));
  }

  return (
    <div className="App">
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {currentOperation ? number1 + currentOperation : ""}
          </div>
          <div className="current-operand">
            {result ? result : !currentOperation ? number1 : number2}
          </div>
        </div>
        <button onClick={allClear} className="span-two">
          AC
        </button>

        <button onClick={deleteNumber}>DEL</button>
        <button
          onClick={() => {
            clickOperation("/");
          }}
          className="com"
        >
          /
        </button>
        <button
          onClick={() => {
            clickNumber(7);
          }}
        >
          7
        </button>
        <button
          onClick={() => {
            clickNumber(8);
          }}
        >
          8
        </button>
        <button
          onClick={() => {
            clickNumber(9);
          }}
        >
          9
        </button>
        <button
          onClick={() => {
            clickOperation("*");
          }}
          className="com"
        >
          *
        </button>
        <button
          onClick={() => {
            clickNumber(4);
          }}
        >
          4
        </button>
        <button
          onClick={() => {
            clickNumber(5);
          }}
        >
          5
        </button>
        <button
          onClick={() => {
            clickNumber(6);
          }}
        >
          6
        </button>
        <button
          onClick={() => {
            clickOperation("+");
          }}
          className="com"
        >
          +
        </button>
        <button
          onClick={() => {
            clickNumber(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            clickNumber(2);
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            clickNumber(3);
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            clickOperation("-");
          }}
          className="com"
        >
          -
        </button>
        <button
          onClick={() => {
            clickNumber(".");
          }}
        >
          .
        </button>
        <button
          onClick={() => {
            clickNumber(0);
          }}
        >
          0
        </button>
        <button onClick={getResult} className="span-two">
          =
        </button>
      </div>
      {/* Boton para guardar */}
      <span className="col">
        <h1></h1>
        <br />
        <br />
        <br />
        {historial.length === 0 && "SIN HISTORIAL"}
        {historial.length !== 0 && (
          <ol>
            <br />
            <br />
            <br />
            {historial.map((item, index) => {
              return (
                <li key={index}>
                  {item.n1}
                  {item.ope}
                  {item.n2}={item.res}
                </li>
              );
            })}
          </ol>
        )
        }
        <div>
        <button onClick={handleborrar}>Eliminar</button>
      </div>
      </span>
    </div>
  );
}

export default App;


