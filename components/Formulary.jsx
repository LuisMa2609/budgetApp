"use client";
import { useState, React, useEffect } from "react";
import CustomInput from "./assets/CustomInput";
import { AiOutlineClose } from "react-icons/ai";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const Formulary = ({formId, onDataChange, deleteForm, formLength, trabajos, dataFields, lineas, tipoAluminio, tipoSatin, tipoVidrio}) => {

  const [formFields, setFormFields] = useState(dataFields);

  const [selectedHerrajes, setSelectedHerrajes] = useState([]);
  const [selectedPerfiles, setSelectedPerfiles] = useState([]);
  
// const lineas = [
//   "Línea 1000",
//   "Línea 2000",
//   "Línea 3000",
//   "Línea 4000",
//   "Línea 5000",
//   "Línea 6000",
//   "Línea 7000"
// ]

// const tiposDeVidrios = [
//   { id: "claro3mm", nombre: "Claro 3mm" },
//   { id: "claro6mm", nombre: "Claro 6mm" },
//   { id: "templado6mm", nombre: "Templado 6mm" },
//   { id: "laminado3+3", nombre: "Laminado 3+3" },
//   { id: "dobleacristalamiento", nombre: "Doble Acristalamiento" },
//   { id: "espejo4mm", nombre: "Espejo 4mm" },
//   { id: "obscuro6mm", nombre: "Obscuro 6mm" }
// ];

// const acabadosSatin = [
//   { id: "satinado_natural", nombre: "Satinado Natural" },
//   { id: "satinado_mate", nombre: "Satinado Mate" },
//   { id: "satinado_brillante", nombre: "Satinado Brillante" },
//   { id: "satinado_anodizado", nombre: "Satinado Anodizado" }, // Común en aluminio
//   { id: "satinado_translucido", nombre: "Satinado Translúcido" }, // Común en vidrio
//   { id: "satinado_esmaltado", nombre: "Satinado Esmaltado" },
//   { id: "satinado_especial", nombre: "Satinado Especial" }
// ];


// const tiposDeAluminio = [
//   { id: "aluminio_6061", nombre: "Aluminio 6061 (Estructural)" },
//   { id: "aluminio_6063", nombre: "Aluminio 6063 (Arquitectónico)" }, // Muy común en perfiles
//   { id: "aluminio_7075", nombre: "Aluminio 7075 (Alta Resistencia)" },
//   { id: "aluminio_5052", nombre: "Aluminio 5052 (Resistencia Corrosión)" },
//   { id: "aluminio_3003", nombre: "Aluminio 3003 (Uso General)" },
//   { id: "aluminio_anodizado", nombre: "Aluminio Anodizado" }, // Un acabado, pero a menudo se clasifica como tipo
//   { id: "aluminio_reciclado", nombre: "Aluminio Reciclado" }
// ];

useEffect(() => {
  console.log("formFields", formFields)
  console.log("formFields.linea", formFields.linea)
})
  
  useEffect(() => {
    setFormFields(dataFields)
  },[dataFields])
  
  const handleTrabajoChange = (target) => {
    if (target.value == "0") {
      const updatedFormFields = {
        ...dataFields,
        trabajoId: null,
        nombreTrabajo: ''
      };
      setSelectedHerrajes([]);
      setSelectedPerfiles([]);
      setFormFields(updatedFormFields);
      return;
    }
    const newSelectedWorkId = parseInt(target.value, 10);
    const selectedTrabajo = trabajos.find(trabajo => trabajo.id == newSelectedWorkId);
    console.log("selectedTrabajo", selectedTrabajo)
    setSelectedHerrajes(selectedTrabajo?.herrajes);
    setSelectedPerfiles(selectedTrabajo?.perfiles);
    const updatedFormFields = {
      ...dataFields,
      trabajoId: newSelectedWorkId,
      nombreTrabajo: selectedTrabajo?.nombre
    };
    setFormFields(updatedFormFields);
    onDataChange(formId, updatedFormFields);
    return updatedFormFields;
  };

  const handlePerfilChange = (target) => {
    const updatedFormFields = {
      ...formFields,
      perfiles: {
        ...formFields.perfiles,
        [target.id]: target.value === '' ? undefined : target.value
      }
    };
    if (target.value === '') delete updatedFormFields.perfiles[target.id];
    setFormFields(updatedFormFields);
    onDataChange(formId, updatedFormFields);
  };

  const handleHerrajeChange = (target) => {
    const updatedFormFields = {
      ...formFields,
      herrajes: {
        ...formFields.herrajes,
        [target.id]: target.value === '' ? undefined : target.value
      }
    };
    if (target.value === '') delete updatedFormFields.herrajes[target.id];
    setFormFields(updatedFormFields);
    onDataChange(formId, updatedFormFields);
  };

  const handleDefaultChange = (target) => {
    const { id, value } = target;
    const updatedFormFields = {
      ...dataFields,
      [id]: parseInt(value)
    };
    if (value === '0') delete updatedFormFields[id];
    setFormFields(updatedFormFields);
    onDataChange(formId, updatedFormFields)
  };

  // Function receiver to handle the inputs form data and manage them
  const handleInputChange = (e) => {
    const target = e?.target;
    console.log("target.value", target.value)
    if (target.id == "trabajo") {
      handleTrabajoChange(target);
    } else if (target.name == "perfil") {
      handlePerfilChange(target);
    } else if (target.name == "herraje") {
      handleHerrajeChange(target);
    } else {
      handleDefaultChange(target);
    }
  };

  function handleDelete(){
    deleteForm(formId);
  }
  
  return (
    <main className="mt-7 container mx-auto">
      <form className="border p-6 rounded shadow space-y-6">

         <div className="flex justify-between">
          <span>Trabajo seleccionado: {formFields.nombreTrabajo}</span>
          {formLength > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleDelete}
            >
              <AiOutlineClose size={14} />
            </Button>
          )}
        </div>
        
        {/* <span>Trabajo seleccionado: { formFields.nombreTrabajo}</span>
        {formLength > 1 && (
            <div className="flex  justify-end">
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
          
        )} */}

        {/* Línea, Trabajo, Vidrio, Satin, Tipo de aluminio */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Select value={formFields.linea ?? ''} onValueChange={(value) => handleInputChange({ target: { id: "linea", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Línea" />
            </SelectTrigger>
            <SelectContent>
              {lineas.map((linea) => (
                <SelectItem key={linea.id} value={linea.id}>{linea.linea} | {linea.pulgadas}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <select className="border p-2 rounded" id="linea" defaultValue="0" onChange={handleInputChange}>
            <option value="0" >Línea</option>
            {lineas.map(linea => (
              <option key={ linea} value={linea}>{linea}</option>
            ))}
          </select> */}

          <Select value={formFields.trabajoId || ''} onValueChange={(value) => handleInputChange({ target: { id: "trabajo", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Trabajo" />
            </SelectTrigger>
            <SelectContent>
              {trabajos.map((trab) => (
                <SelectItem key={trab.id} value={trab.id}>{trab.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <select className="border p-2 rounded" id="trabajo" defaultValue="0"  onChange={handleInputChange}>
            <option value="0">Trabajo</option>
            {trabajos.map((trab) => (
              <option key={ trab.id} value={trab.id}>{trab.nombre}</option>
            ))}
          </select> */}

            <Select value={formFields.tipoAluminio ?? ''} onValueChange={(value) => handleInputChange({ target: { id: "tipoAluminio", value } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de aluminio" />
              </SelectTrigger>
              <SelectContent>
                {tipoAluminio.map((aluminio) => (
                  <SelectItem key={aluminio.id} value={aluminio.id}>{aluminio.tipo_aluminio}</SelectItem>
                ))}
              </SelectContent>
            </Select>

              {/* <select className="border p-2 rounded" id="tipoALuminio" defaultValue="0" onChange={handleInputChange}>
                <option value="0" >Tipo de aluminio</option>
                {tiposDeAluminio.map(aluminio => (
                  <option key={ aluminio.id} value={aluminio.id}>{aluminio.nombre}</option>
                ))}
              </select> */}

          <Select value={formFields.tipoVidrio ?? ''} onValueChange={(value) => handleInputChange({ target: { id: "tipoVidrio", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de vidrio" />
            </SelectTrigger>
            <SelectContent>
              {tipoVidrio.map((vidrio) => (
                <SelectItem key={vidrio.id} value={vidrio.id}>{vidrio.tipo_vidrio}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <select className="border p-2 rounded" id="tipoVidrio" defaultValue="0" onChange={handleInputChange}>
            <option value="0" >Tipo de vidrio</option>
            {tiposDeVidrios.map(vidrio => (
              <option value={vidrio.id} key={vidrio.id}>{vidrio.nombre}</option>
            ))}
          </select> */}

          <Select value={formFields.tipoSatin ?? ''} onValueChange={(value) => handleInputChange({ target: { id: "tipoSatin", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Satin" />
            </SelectTrigger>
            <SelectContent>
              {tipoSatin.map((satin) => (
                <SelectItem key={satin.id} value={satin.id}>{satin.tipo_satin}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <select className="border p-2 rounded" id="tipoSatin" defaultValue="0" onChange={handleInputChange}>
            <option value="0" >Satin</option>
            {acabadosSatin.map(satin => (
              <option value={satin.id} key={satin.id}>{satin.nombre}</option>
            ))}
          </select> */}

        </div>
        <div>
        {formFields?.trabajoId !== null && formFields?.trabajoId !== '' &&(
          <> 
          <span>trabajo: {formFields.nombreTrabajo}</span>
            {/* Perfiles de Aluminio */}
            <div>
              <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-2 relative" id="perfil">
                           {selectedPerfiles?.map(perfil => (
                                <CustomInput type="text" label={perfil.nombre} key={perfil.id} id={perfil.id} name="perfil" value={formFields.perfiles?.[perfil.id] || ""} onChange={handleInputChange} />
                          ))}
                    </div>

            </div>

            {/* Herrajes y Accesorios */}
            <div>
              <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
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
