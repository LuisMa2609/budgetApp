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

  useEffect(() => {
    console.log('Formulary: received formFields ->', formFields);
  })
  
  useEffect(() => {
    setFormFields(dataFields)
  },[dataFields])

  const handleTrabajoChange = (target) => {
    console.log("handleTrabajoChange", target);
    console.log("handleTrabajoChange triggered with target:", target);
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
    console.log("test passed handleHerrajeChange")
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
    if (!target || target.value == "") return;

    // use a switch to route by id/name
    switch (true) {
      case target.id === "trabajo":
        handleTrabajoChange(target);
        break;
      case target.name === "perfil":
        handlePerfilChange(target);
        break;
      case target.name === "herraje":
        handleHerrajeChange(target);
        break;
      default:
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
        

        {/* Línea, Trabajo, Vidrio, Satin, Tipo de aluminio */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Select value={formFields.linea || ''} onValueChange={(value) => handleInputChange({ target: { id: "linea", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Línea" />
            </SelectTrigger>
            <SelectContent>
              {lineas.map((linea) => (
                <SelectItem key={linea.id} value={linea.id}>{linea.linea} | {linea.pulgadas}</SelectItem>
              ))}
            </SelectContent>
          </Select>

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

            <Select value={formFields.tipoAluminio || ''} onValueChange={(value) => handleInputChange({ target: { id: "tipoAluminio", value } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de aluminio" />
              </SelectTrigger>
              <SelectContent>
                {tipoAluminio.map((aluminio) => (
                  <SelectItem key={aluminio.id} value={aluminio.id}>{aluminio.tipo_aluminio}</SelectItem>
                ))}
              </SelectContent>
            </Select>

          <Select value={formFields.tipoVidrio || ''} onValueChange={(value) => handleInputChange({ target: { id: "tipoVidrio", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de vidrio" />
            </SelectTrigger>
            <SelectContent>
              {tipoVidrio.map((vidrio) => (
                <SelectItem key={vidrio.id} value={vidrio.id}>{vidrio.tipo_vidrio}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formFields.tipoSatin || ''} onValueChange={(value) => handleInputChange({ target: { id: "tipoSatin", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Satin" />
            </SelectTrigger>
            <SelectContent>
              {tipoSatin.map((satin) => (
                <SelectItem key={satin.id} value={satin.id}>{satin.tipo_satin}</SelectItem>
              ))}
            </SelectContent>
          </Select>

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
                                <CustomInput type="text" label={herraje.nombre} key={herraje.id} id={herraje.id} name="herraje" value={formFields.herrrajes?.[herraje.id] || ""  } onChange={e => handleInputChange(e, 'herraje')} />
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
