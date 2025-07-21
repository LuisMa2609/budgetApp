'use client'
import {React, useEffect, useState} from "react";
import CustomInput from "./assets/CustomInput";
import { AiOutlineClose } from "react-icons/ai";


const Formulary = ({formId, onDataChange, deleteForm, formLength, trabajos, dataFields}) => {

  const [formFields, setFormFields] = useState(dataFields);

  const [selectedHerrajes, setSelectedHerrajes] = useState([]);
  const [selectedPerfiles, setSelectedPerfiles] = useState([]);
  
  useEffect(() => {
    setFormFields(dataFields)
  },[dataFields])
  
  const handleInputChange = (e) =>{
    const target = e?.target
    console.log(e)
    if(target.id == "trabajo"){
      if(target.value == "0"){
          const updatedFormFields = {
          ...dataFields,
          trabajoId: '',
          nombreTrabajo: ''
        }

        setSelectedHerrajes([]);
        setSelectedPerfiles([]);
        setFormFields(updatedFormFields);
        return
      }
      
      const newSelectedWorkId = target.value
      const selectedTrabajo = trabajos.find(trabajo => trabajo.id == newSelectedWorkId );

      setSelectedHerrajes(selectedTrabajo?.herrajes);
      setSelectedPerfiles(selectedTrabajo?.perfiles);

      const updatedFormFields = {
        ...dataFields,
        trabajoId: newSelectedWorkId,
        nombreTrabajo: selectedTrabajo?.nombre
      }
      setFormFields(updatedFormFields);
      onDataChange(formId, updatedFormFields);
      return updatedFormFields;

    }else if(target.name == "perfil"){
      const updatedFormFields = {
        ...formFields,
        perfiles: {
          ...formFields.perfiles,
          [target.id]: target.value === '' ? undefined : target.value
        }
      };
      if (target.value === '')delete updatedFormFields.perfiles[target.id];
      setFormFields(updatedFormFields)
      onDataChange(formId, updatedFormFields);

    }else if(target.name == "herraje"){
      // setFormFields(prev => ({
      //   ...prev,
      //   herrajes: {
      //     ...prev.herrajes,
      //     [target.id]: target.value
      //   }
      // }))

      const updatedFormFields = {
        ...formFields,
        herrajes: {
          ...formFields.herrajes,
          [target.id]: target.value === '' ? undefined : target.value
        }
      };
      if (target.value === '')delete updatedFormFields.herrajes[target.id];
      setFormFields(updatedFormFields)
      onDataChange(formId, updatedFormFields);
      
      // setFormFields(prev => {
      //   const updatedHerrajes = {...prev.herrajes};
      //   if(target.value === ''){
      //     delete updatedHerrajes[target.id];
      //   }else{
      //     updatedHerrajes[target.id] = target.value;
      //   }
      //   const updatedFormFields = {...prev, herrajes: updatedHerrajes}
      //   onDataChange(formId, updatedFormFields)
      //   return updatedFormFields
      // })

    }
  }

  function button(){
    deleteForm(formId);
  }
  
  return (
    <main className="mt-7 container mx-auto">
      <form className="border p-6 rounded shadow space-y-6">
        <span>Trabajo seleccionado: { formFields.nombreTrabajo}</span>
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
        {formFields?.trabajoId !== null && formFields?.trabajoId !== '' &&(
          <> 
          <span>trabajo: {formFields.nombreTrabajo}</span>
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
                           {selectedPerfiles?.map(perfil => (
                                <CustomInput type="text" label={perfil.nombre} key={perfil.id} id={perfil.id} name="perfil" value={formFields.perfiles?.[perfil.id] || ""} onChange={handleInputChange} />
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
                          {selectedHerrajes?.map(herraje => (
                                <CustomInput type="text" label={herraje.nombre} key={herraje.id} id={herraje.id} name="herraje" onChange={e => handleInputChange(e, 'herraje')} />
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
