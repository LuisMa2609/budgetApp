"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function AddFormView() {
  // Estado para el input nombre
  const [nombre, setNombre] = useState("");

  // Estado para selects
  const [linea, setLinea] = useState("");
  const [perfil, setPerfil] = useState("");
  const [herraje, setHerraje] = useState("");

  // Listas (podrían venir de props o API)
  const lineas = [
    { id: "linea1", nombre: "Línea 1" },
    { id: "linea2", nombre: "Línea 2" },
    { id: "linea3", nombre: "Línea 3" },
  ];
  const perfiles = [
    { id: "perfil1", nombre: "Perfil 1" },
    { id: "perfil2", nombre: "Perfil 2" },
  ];
  const herrajes = [
    { id: "herraje1", nombre: "Herraje 1" },
    { id: "herraje2", nombre: "Herraje 2" },
  ];

  // Funciones para agregar perfiles y herrajes (ejemplo)
  const handleAddPerfil = () => {
    if (perfil) {
      alert(`Perfil agregado: ${perfil}`);
      setPerfil("");
    }
  };

  const handleAddHerraje = () => {
    if (herraje) {
      alert(`Herraje agregado: ${herraje}`);
      setHerraje("");
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex  items-center gap-4 mb-6">
        <div className="relative w-[400px]">
            <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre:</label> 
        </div>
      </div>

      <form className="border p-6 rounded shadow space-y-6">
        {/* Select Línea */}
        <div className="w-[400px]">
          <Select value={linea} onValueChange={setLinea}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona Línea" />
            </SelectTrigger>
            <SelectContent>
              {lineas.map(({ id, nombre }) => (
                <SelectItem key={id} value={id}>
                  {nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Perfiles de aluminio */}
        <div>
          <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
          <div className="flex gap-2 items-center">
            <div className="w-[400px]">
              <Select value={perfil} onValueChange={setPerfil}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona perfil" />
                </SelectTrigger>
                <SelectContent>
                  {perfiles.map(({ id, nombre }) => (
                    <SelectItem key={id} value={id}>
                      {nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
              aria-label="Agregar perfil"
              onClick={handleAddPerfil}
            >
              <FaPlus size={16} />
            </Button>
          </div>
        </div>

        {/* Herrajes y accesorios */}
        <div>
          <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
          <div className="flex gap-2 items-center">
            <div className="w-[400px]">
              <Select value={herraje} onValueChange={setHerraje}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona herraje" />
                </SelectTrigger>
                <SelectContent>
                  {herrajes.map(({ id, nombre }) => (
                    <SelectItem key={id} value={id}>
                      {nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
              aria-label="Agregar herraje"
              onClick={handleAddHerraje}
            >
              <FaPlus size={16} />
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default AddFormView;