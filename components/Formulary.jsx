'use client'
// import { useEffect, useState } from "react";
import {React, useEffect, useState} from "react";
import CustomInput from "./assets/CustomInput";

const Formulary = ({formId, onDataChange}) => {
  const[trabajos, setTrabajos] = useState([]);
  const [trabajo, setTrabajo] = useState([]);
  const [perfil, setPerfil] = useState("");
  const [numForm, setNumForm] = useState(1);
  const [formData, setFormData] = useState([]);

  const workSelected = (e) =>{
    setTrabajo(e.target.value)
    console.log("si jalo")
  }
  
  // const workSet = () ={
  //   console.log("hola")
  // }
  
  useEffect(() => {
    fetch('/api/trabajos')
    .then(res => res.json())
    .then(data => setTrabajos(data))
  }, [])
  
  // console.log(trabajos)
  
        //   <h1>Lista</h1>
        // <ul>
        //   {trabajos.map((t, i) => (
        // // <input key={i}>id: {t.catalogo_id} | Nombre: {t.nombre_catalogo} Linea: {t.linea} {t.herrajes_accesorios} {t.perfiles_aluminio}</input>
        //     <input type="text" key={i} placeholder={t.nombre} className="border p-2 rounded"/>
        //   ))}
        // </ul>
  
  return (
    <div>
      <form className="border p-6 rounded shadow space-y-6">
        <span>{formId}</span>
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
        


        {/* Perfiles de Aluminio */}
        <div>
          <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>

              {trabajos.map((trab) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={trab.id}>
                  {trab.perfiles.map((perfil) => (
                    // <CustomInput key={perfil.id} type="text" placeholder={perfil.nombre} className="border p-2 rounded" />
                    <CustomInput label={perfil.nombre} key={perfil.id} id={perfil.id} name={perfil.nombre} value="" onChange={() => {}} />
                    
                  ))}
                </div>
              ))}
              
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Marco" className="border p-2 rounded" />
            <input type="text" placeholder="Hoja Ap. Int" className="border p-2 rounded" />
            <input type="text" placeholder="Contramarco" className="border p-2 rounded" />
            <input type="text" placeholder="Intermedio" className="border p-2 rounded" />
          </div> */}
        </div>

        {/* Herrajes y Accesorios */}
        <div>
          <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>

              {trabajos.map((trab) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={trab.id}>
                  {trab.herrajes.map((herraje) => (
                    <input key={herraje.id} type="text" placeholder={herraje.nombre} className="border p-2 rounded" />
                  ))}
                </div>
              ))}

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Escuadra Ext. Ventana" className="border p-2 rounded" />
            <input type="text" placeholder="Bisagra Ventana" className="border p-2 rounded" />
            <input type="text" placeholder="Cierre de presión reversible" className="border p-2 rounded" />
            <input type="text" placeholder="Otro" className="border p-2 rounded" />
            <input type="text" placeholder="Empaque Biextruido" className="border p-2 rounded" />
            <input type="text" placeholder="Calza" className="border p-2 rounded" />
            <input type="text" placeholder="Tapa Dren" className="border p-2 rounded" />
          </div> */}
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
