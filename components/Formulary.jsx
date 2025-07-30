"use client"

import { useState, useEffect } from "react";
import CustomInput from "./assets/CustomInput";
import { AiOutlineClose } from "react-icons/ai";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const Formulary = ({ formId, onDataChange, deleteForm, formLength, trabajos, dataFields }) => {
  const [formFields, setFormFields] = useState(dataFields);
  const [selectedHerrajes, setSelectedHerrajes] = useState([]);
  const [selectedPerfiles, setSelectedPerfiles] = useState([]);

  const lineas = [
    "Línea 1000",
    "Línea 2000",
    "Línea 3000",
    "Línea 4000",
    "Línea 5000",
    "Línea 6000",
    "Línea 7000"
  ];

  const tiposDeVidrios = [
    { id: "claro3mm", nombre: "Claro 3mm" },
    { id: "claro6mm", nombre: "Claro 6mm" },
    { id: "templado6mm", nombre: "Templado 6mm" },
    { id: "laminado3+3", nombre: "Laminado 3+3" },
    { id: "dobleacristalamiento", nombre: "Doble Acristalamiento" },
    { id: "espejo4mm", nombre: "Espejo 4mm" },
    { id: "obscuro6mm", nombre: "Obscuro 6mm" }
  ];

  const acabadosSatin = [
    { id: "satinado_natural", nombre: "Satinado Natural" },
    { id: "satinado_mate", nombre: "Satinado Mate" },
    { id: "satinado_brillante", nombre: "Satinado Brillante" },
    { id: "satinado_anodizado", nombre: "Satinado Anodizado" },
    { id: "satinado_translucido", nombre: "Satinado Translúcido" },
    { id: "satinado_esmaltado", nombre: "Satinado Esmaltado" },
    { id: "satinado_especial", nombre: "Satinado Especial" }
  ];

  const tiposDeAluminio = [
    { id: "aluminio_6061", nombre: "Aluminio 6061 (Estructural)" },
    { id: "aluminio_6063", nombre: "Aluminio 6063 (Arquitectónico)" },
    { id: "aluminio_7075", nombre: "Aluminio 7075 (Alta Resistencia)" },
    { id: "aluminio_5052", nombre: "Aluminio 5052 (Resistencia Corrosión)" },
    { id: "aluminio_3003", nombre: "Aluminio 3003 (Uso General)" },
    { id: "aluminio_anodizado", nombre: "Aluminio Anodizado" },
    { id: "aluminio_reciclado", nombre: "Aluminio Reciclado" }
  ];

  useEffect(() => {
    setFormFields(dataFields);
  }, [dataFields]);
 
  const handleInputChange = (e) => {
    const target = e?.target;
    const { id, value } = target;
    const updatedFormFields = {
      ...formFields,
      [id]: value
    };
    setFormFields(updatedFormFields);
    onDataChange(formId, updatedFormFields);
  };

  const handleDelete = () => deleteForm(formId);

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Select onValueChange={(value) => handleInputChange({ target: { id: "linea", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Línea" />
            </SelectTrigger>
            <SelectContent>
              {lineas.map((linea) => (
                <SelectItem key={linea} value={linea}>{linea}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleInputChange({ target: { id: "trabajo", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Trabajo" />
            </SelectTrigger>
            <SelectContent>
              {trabajos.map((trab) => (
                <SelectItem key={trab.id} value={trab.id}>{trab.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleInputChange({ target: { id: "tipoALuminio", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de aluminio" />
            </SelectTrigger>
            <SelectContent>
              {tiposDeAluminio.map((aluminio) => (
                <SelectItem key={aluminio.id} value={aluminio.id}>{aluminio.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleInputChange({ target: { id: "tipoVidrio", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de vidrio" />
            </SelectTrigger>
            <SelectContent>
              {tiposDeVidrios.map((vidrio) => (
                <SelectItem key={vidrio.id} value={vidrio.id}>{vidrio.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleInputChange({ target: { id: "tipoSatin", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Satin" />
            </SelectTrigger>
            <SelectContent>
              {acabadosSatin.map((satin) => (
                <SelectItem key={satin.id} value={satin.id}>{satin.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </main>
  );
};

export default Formulary;