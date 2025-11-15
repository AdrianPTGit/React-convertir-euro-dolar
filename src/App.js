// Importamos los estilos de la aplicación
import './App.css';

// Importamos hooks de React
import { useRef, useState, useEffect } from 'react';

function App() {

  // useRef crea referencias a elementos del DOM
  const eurosRef = useRef();        // Referencia al input donde el usuario escribe los euros
  const resultadoRef = useRef();    // Referencia al elemento donde se mostrará el resultado

  // useState para almacenar el valor del cambio de Euro a Dólar
  const [valorCambio, setValorCambio] = useState(null);

  // useEffect se ejecuta después del primer render
  useEffect(() => {
    // Función asíncrona para llamar a la API de tipo de cambio
    const llamaApiCambio = async () => {
      try {
        // Hacemos la llamada a la API que devuelve los tipos de cambio
        const respuesta = await fetch("https://v6.exchangerate-api.com/v6/34434cfc01b1237dca9afb24/latest/EUR");

        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();

        // Guardamos el valor de conversión de EUR a USD en el estado
        setValorCambio(datos.conversion_rates.USD);

      } catch (error) {
        // Si hay un error, lo mostramos en consola
        console.error("Error en la llamada a la API", error);
      }
    }

    // Llamamos a la función que consulta la API
    llamaApiCambio();

  }, []); // Array vacío: se ejecuta solo una vez al montar el componente

  // Función que realiza la conversión de euros a dólares
  const convertir = () => {
    const eurosValor = parseFloat(eurosRef.current.value); 
    /**
     * eurosRef                     => Objeto de referencia creado con useRef()
     * eurosRef.current             => Elemento actual del DOM referenciado (input)
     * eurosRef.current.value       => Valor que el usuario escribió en el input
     */

    // Calculamos los dólares multiplicando el valor introducido por el tipo de cambio
    const dolares = eurosValor * valorCambio;

    // Mostramos el resultado en el DOM, con 2 decimales y símbolo $
    resultadoRef.current.innerHTML = dolares.toFixed(2) + "$";
  }

  return (
    <div>
      <h1>Conversor Euro Dolar</h1>

      {/* Input donde el usuario ingresa los euros */}
      <input 
        className='centrarElementos' 
        type='text' 
        ref={eurosRef} 
      />

      {/* Botón que ejecuta la conversión al hacer clic */}
      <button 
        className='boton' 
        onClick={convertir}
      >
        Convertir
      </button>

      <div>
        {/* Aquí se mostrará el resultado de la conversión */}
        <h2 
          className='resultado' 
          ref={resultadoRef}
        ></h2>
      </div>
    </div>
  )
}

// Exportamos el componente para usarlo en otros archivos
export default App;
