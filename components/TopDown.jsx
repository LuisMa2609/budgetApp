'use client'

import React, { useEffect } from 'react';

const TopDown = ({formLength, newForm, guardarFn}) => {
  
  const handleClick = () =>{
    newForm();
  }

  const handleSave = () => {
    guardarFn();
  }
  
  return (
    <>
      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleClick}
        >
          Añadir
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>

      {/* Totales alineados a la derecha */}
      <div className="mt-6 flex flex-col items-end space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="iva">IVA (16%):</label>
          <span>$</span>
          <input
            type="text"
            id="iva"
            className="w-24 border p-1 rounded text-right"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="total">Total:</label>
          <span>$</span>
          <input
            type="text"
            id="total"
            className="w-24 border p-1 rounded text-right"
          />
        </div>
      </div>
    </>
  );
};

export default TopDown;
