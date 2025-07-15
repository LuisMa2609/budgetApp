'use client'
import {React, useEffect, useState} from "react";
import CustomInput from "./assets/CustomInput";
import { AiOutlineClose } from "react-icons/ai";


const Formulary = ({formId, onDataChange, deleteForm, formLength, trabajos, dataFields}) => {

  const [formFields, setFormFields] = useState(dataFields);
  useEffect(() => {
    setFormFields(dataFields)
    console.log(dataFields)
  },[dataFields])
  
  useEffect(() => {
    const currentWorkId = dataFields.trabajoId
    console.log("work", currentWorkId)
    if(currentWorkId !== '0' && trabajos.lenght > 0){
      const work = trabajos.find(t => String(t.id) === String(currentWorkId));

      if(work){

        const newFormFields= {
          ...formFields,
          nombreTrabajo: work.nombre,
          // herrajes: updatedHerrajes,
          // perfiles: updatedPerfiles
        };
        setFormFields(newFormFields);
        onDataChange(formId, newFormFields);
      }
      else if(currentWorkId === '0'){
        const newFormFields = {
          ...formFields,
          nombreTrabajo: '',
          herrajes: [],
          perfiles: []
        };
        setFormFields(newFormFields);
        onDataChange(formId, newFormFields);
      } else {
        const newFormFields = {
          ...formFields,
          nombreTrabajo: '',
          herrajes: [],
          perfiles: []
        };
        setFormFields(newFormFields);
        onDataChange(formId, newFormFields);
      }
    }
  }, [formFields.trabajoId, trabajos, formId, onDataChange])

  const [trabajo, setTrabajo] = useState();
  const [selectedHerrajes, setSelectedHerrajes] = useState([]);
  const [selectedPerfiles, setSelectedPerfiles] = useState([]);

  const handleInputChange = (e) =>{
    if(e.target?.id == "trabajo"){
      const newSelectedWorkId = e.target.value
      const updatedFormFields = {
        ...dataFields,
        trabajoId: newSelectedWorkId
      }

      setFormFields(updatedFormFields);

      // const selectedTrabajo = trabajos.find(trabajo => trabajo.id == e.target.value );
      // console.log("valores", dataFields)
      // const { value, id} = e.target;
      // onDataChange(formId,selectedTrabajo.nombre, value, id)
      
    }
    

    // const updatedFields = {
    //   ...formData,
    //   id:{[name]: value}
    // };
    // setFormData(updatedFields);


  }

  useEffect(() =>{ 
    console.log("exported variables:", "formId", formId, "formLength",formLength, "trabajos", trabajos, "details", dataFields)
  })
  
  const handleInputChange1 = (e) => {
    const {name, value} = e.target;
    const updatedFields = {
      ...formData,
      "VALOR":{[name]: value}
    };
    setFormData(updatedFields);

    onDataChange(formId, updatedFields);
  }
  
  function button(){
    deleteForm(formId);
  }
  
  return (
    <main className="mt-7 container mx-auto">
      <form className="border p-6 rounded shadow space-y-6">
        <span>Trabajo seleccionado: { trabajo > 0 && (trabajo)}</span>
        {formLength > 1 && (
            <div className="flex  justify-end">
                {/* <span>{formId}</span> */}
                <button
                  type="button"
                  className="self-start text-red-500 hover:text-white border border-red-500 hover:bg-red-700 
                    focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded 
                    text-xs px-2 py-1 text-center dark:border-red-500 dark:text-red-500 
                    dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                    onClick={button}
                >
                  <AiOutlineClose size={14} />
                </button>
            </div>
          ) 
        }

        {/* Línea, Trabajo, Vidrio, Satin, Tipo de aluminio */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <select className="border p-2 rounded" defaultValue="" onChange={handleInputChange}>
            <option value="" >Línea</option>
            {/* opciones */}
          </select>
          <select className="border p-2 rounded" id="trabajo" defaultValue="0"  onChange={handleInputChange}>
            <option value="0">Trabajo</option>
            {trabajos.map((trab) => (
              <option key={ trab.id} value={trab.id}>{trab.nombre}</option>
            ))}
          </select>

              <select className="border p-2 rounded" defaultValue="0">
                <option value="0" >Tipo de aluminio</option>
                {/* <option value={perfil.id}>{perfil.nombre}</option> */}
              </select>

          <select className="border p-2 rounded" defaultValue="0" onChange={handleInputChange}>
            <option value="0" >Tipo de vidrio</option>
            <option value="1" >Vidrio 1</option>
            <option value="2" >Vidrio 2</option>
          </select>
          <select className="border p-2 rounded" defaultValue="">
            <option value="" >Satin</option>
          </select>
        </div>
        <div>
        {trabajo !== undefined && trabajo > 0 &&(
          <> 
          <span>trabajo: {trabajo}</span>
            {/* Perfiles de Aluminio */}
            <div>
              <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
                  {/* {trabajos.map((trab) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-2 relative" key={trab.id}>
                      {
                      trab.perfiles.map((perfil) => (
                        <CustomInput label={perfil.nombre} key={perfil.id} id={perfil.id} name={perfil.nombre} value="" onChange={handleInputChange} />
                      ))}
                    </div>
                  ))} */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-2 relative" id="perfil">
                           {selectedPerfiles.map(perfil => (
                                <CustomInput type="text" label={perfil.nombre} key={perfil.id} id={perfil.id} name={perfil.nombre}  onChange={handleInputChange} />
                          ))}
                    </div>

            </div>

            {/* Herrajes y Accesorios */}
            <div>
              <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
                  {/* {trabajos.map((trab) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-2 relative" key={trab.id}>
                      {trab.herrajes.map((herraje) => (
                        // <CustomInput label={perfil.nombre} key={perfil.id} id={perfil.id} name={perfil.nombre} value="" onChange={handleInputChange} />
                        <CustomInput label={herraje.nombre} key={herraje.id} type="text" name={herraje.nombre} value="" onChange={handleInputChange} />
                      ))}
                    </div>
                  ))} */}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-2 relative" id="herraje">
                          {selectedHerrajes.map(herraje => (
                                <CustomInput type="text" label={herraje.nombre} key={herraje.id} id={herraje.id} name={herraje.nombre} value="" onChange={handleInputChange} />
                          ))}
                    </div>
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
    </main>
  );
};

export default Formulary;
