import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Formulary = () => {
  return (
    <form className="border p-6 rounded shadow space-y-6">
     <div className="flex  justify-end">
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
        <select className="border p-2 rounded" defaultValue="">
          <option value="" disabled>Línea</option>
        </select>
        <select className="border p-2 rounded" defaultValue="">
          <option value="" disabled>Trabajo</option>
        </select>
        <select className="border p-2 rounded" defaultValue="">
          <option value="" disabled>Tipo de aluminio</option>
        </select>
        <select className="border p-2 rounded" defaultValue="">
          <option value="" disabled>Tipo de vidrio</option>
        </select>
        <select className="border p-2 rounded" defaultValue="">
          <option value="" disabled>Satin</option>
        </select>
      </div>

      <div>
        <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
           <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Marco</label>
        </div>
      </div>

      <div>
        <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Escuadre Ext. Int</label>
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
