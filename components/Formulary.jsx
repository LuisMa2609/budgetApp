"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const options = {
  linea: ["Serie 100", "Serie 200", "Serie 300"],
  trabajo: ["Puerta", "Ventana", "Cortina"],
  aluminio: ["Natural", "Negro", "Blanco"],
  vidrio: ["Claro", "Esmerilado", "Reflecta"],
  satin: ["Sí", "No"],
};

const SelectBox = ({ label, items, selected, setSelected, placeholder }) => {
  return (
    <div className="relative">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="border p-2 rounded w-full text-left flex justify-between items-center">
            {selected || (
              <span className="text-gray-400">
                {placeholder || `Selecciona ${label.toLowerCase()}`}
              </span>
            )}
            <ChevronUpDownIcon className="w-5 h-5 text-gray-500 ml-2" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg max-h-60 overflow-auto ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
            {items.map((item, idx) => (
              <Listbox.Option
                key={idx}
                value={item}
                className={({ active }) =>
                  `cursor-pointer select-none relative px-4 py-2 ${
                    active
                      ? "bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white"
                      : "text-gray-900 dark:text-white"
                  }`
                }
              >
                {item}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

const Formulary = () => {
  const [trabajo, setTrabajo] = useState("");
  const [linea, setLinea] = useState("");
  const [aluminio, setAluminio] = useState("");
  const [vidrio, setVidrio] = useState("");
  const [satin, setSatin] = useState("");

  return (
    <form className="border p-6 rounded shadow space-y-6">
      <div className="flex justify-end">
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <SelectBox
          label="Línea"
          items={options.linea}
          selected={linea}
          setSelected={setLinea}
          placeholder={`Según trabajo: ${trabajo || "Linea/Pulgada"}`}
        />
        <SelectBox
          label="Trabajo"
          items={options.trabajo}
          selected={trabajo}
          setSelected={setTrabajo}
        />
        <SelectBox
          label="Tipo de aluminio"
          items={options.aluminio}
          selected={aluminio}
          setSelected={setAluminio}
        />
        <SelectBox
          label="Tipo de vidrio"
          items={options.vidrio}
          selected={vidrio}
          setSelected={setVidrio}
        />
        <SelectBox
          label="Satin"
          items={options.satin}
          selected={satin}
          setSelected={setSatin}
        />
      </div>

      <div className="mt-4 mb-2">
        <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          <input
            type="text"
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-0 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
          >
            Marco
          </label>
        </div>
      </div>

      <div className="mt-4 mb-2">
        <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          <input
            type="text"
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-0 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
          >
            Escuadre Ext. Int
          </label>
        </div>
      </div>

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
  );
};

export default Formulary;
