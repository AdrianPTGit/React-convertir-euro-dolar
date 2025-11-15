import './App.css';

import { useRef, useState, useEffect } from 'react';

function App() {
  const eurosRef = useRef();
  const resultadoRef = useRef();
  const [valorCambio, setValorCambio] = useState(null);

  useEffect(
    () => {
      const llamaApiCambio = async () => {
        try {
          // llamada a API
          const respuesta = await fetch("https://v6.exchangerate-api.com/v6/34434cfc01b1237dca9afb24/latest/EUR");
          // recibe el json con los datos de cambio
          const datos = await respuesta.json();
          setValorCambio(datos.conversion_rates.USD);

        } catch (error) {

          console.error("Error en la llamada a la API", error);

        }
      }

      llamaApiCambio();
    }, [ ]); //cuando mostrar useEffect
  
    
  const convertir = () => {
    const eurosValor = parseFloat(eurosRef.current.value)

    const dolares = eurosValor * valorCambio; 


    resultadoRef.current.innerHTML = dolares.toFixed(2) + "$";


  }
  return (
    <div>
      <h1>Conversor Euro Dolar</h1>
      <input className='centrarElementos' type='text' ref={eurosRef}>
      </input>
      <button className='boton' onClick={convertir}>
        Convertir
      </button>
      <div>
        <h2 className='resultado' ref={resultadoRef}></h2>
      </div>
    </div>
  )

}

export default App;
