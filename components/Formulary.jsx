'use client'
import {React, useEffect, useState} from "react";
import CustomInput from "./assets/CustomInput";
import { AiOutlineClose } from "react-icons/ai";

const Formulary = ({formId, onDataChange}) => {
  const [trabajos, setTrabajos] = useState([]);
  const [trabajo, setTrabajo] = useState();
  const [perfil, setPerfil] = useState("");
  const [numForm, setNumForm] = useState(1);
  const [formData, setFormData] = useState([]);

  const workSelected = (e) =>{
    setTrabajo(e.target.value)
    console.log("si jalo")
  }
  
  useEffect(() => {
    console.log("trabajos", trabajos)
  }, [trabajos])
  
  useEffect(() => {
    fetch('/api/trabajos')
    .then(res => res.json())
    .then(data => setTrabajos(data))
  }, [])
  
  return (
    <div>
      <form className="border p-6 rounded shadow space-y-6">
        <div className="flex  justify-end">
            <span>{formId}</span>
            <button
              type="button"
              className="self-start text-red-500 hover:text-white border border-red-500 hover:bg-red-700 
                focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded 
                text-xs px-2 py-1 text-center dark:border-red-500 dark:text-red-500 
                dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
            >
              <AiOutlineClose size={14} />
            </button>
        </div>
        {/* Línea, Trabajo, Vidrio, Satin, Tipo de aluminio */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <select className="border p-2 rounded" defaultValue="">
            <option value="" disabled>Línea</option>
            {/* opciones */}
          </select>
          {trabajos.map((trab) => (
          <select className="border p-2 rounded" defaultValue="0" key={ trab.id} onChange={workSelected}>
            <option value="0">Trabajo</option>
            <option value={trab.id}>{trab.nombre}</option>
          </select>
          
          ))}

              <select className="border p-2 rounded" defaultValue="0">
                <option value="0" disabled>Tipo de aluminio</option>
                {/* <option value={perfil.id}>{perfil.nombre}</option> */}
              </select>

          <select className="border p-2 rounded" defaultValue="">
            <option value="" disabled>Tipo de vidrio</option>
          </select>
          <select className="border p-2 rounded" defaultValue="">
            <option value="" disabled>Satin</option>
          </select>
        </div>
        <div>
          <button type="button" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition" onClick={() => {console.log(trabajo)}}>wachar trabajo</button>
          <br />
        {trabajo !== undefined && trabajo > 0 &&(
          <> 
          <span>trabajo: {trabajo}</span>
            {/* Perfiles de Aluminio */}
            <div>
              <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
                  {trabajos.map((trab) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative" key={trab.id}>
                      {trab.perfiles.map((perfil) => (
                        <CustomInput label={perfil.nombre} key={perfil.id} id={perfil.id} name={perfil.nombre} value="" onChange={() => {}} />
                      ))}
                    </div>
                  ))}
            </div>

            {/* Herrajes y Accesorios */}
            <div>
              <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
                  {trabajos.map((trab) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative" key={trab.id}>
                      {trab.herrajes.map((herraje) => (
                        // <CustomInput label={perfil.nombre} key={perfil.id} id={perfil.id} name={perfil.nombre} value="" onChange={() => {}} />
                        <CustomInput label={herraje.nombre} key={herraje.id} type="text" name={herraje.nombre} value="" onChange={() => {}} />
                      ))}
                    </div>
                  ))}
            </div>
          </>
        )}

        </div>


        {/* Totales */}
        <div className="mt-6 flex justify-end">
          <div className="flex items-center gap-2">
            <label htmlFor="totalNeto">Total neto:</label>
            <span>$</span>
            <input
              id="totalNeto"
              type="text"
              className="w-24 border p-1 rounded text-right"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Formulary;
