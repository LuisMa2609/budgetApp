import React from "react";

const Formulary = () => {
  return (
    <form className="border p-6 rounded shadow space-y-6">
      {/* Línea, Trabajo, Vidrio, Satin, Tipo de aluminio */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <select className="border p-2 rounded" defaultValue="">
          <option value="" disabled>Línea</option>
          {/* opciones */}
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

      {/* Perfiles de Aluminio */}
      <div>
        <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Marco" className="border p-2 rounded" />
          <input type="text" placeholder="Hoja Ap. Int" className="border p-2 rounded" />
          <input type="text" placeholder="Contramarco" className="border p-2 rounded" />
          <input type="text" placeholder="Intermedio" className="border p-2 rounded" />
        </div>
      </div>

      {/* Herrajes y Accesorios */}
      <div>
        <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Escuadra Ext. Ventana" className="border p-2 rounded" />
          <input type="text" placeholder="Bisagra Ventana" className="border p-2 rounded" />
          <input type="text" placeholder="Cierre de presión reversible" className="border p-2 rounded" />
          <input type="text" placeholder="Otro" className="border p-2 rounded" />
          <input type="text" placeholder="Empaque Biextruido" className="border p-2 rounded" />
          <input type="text" placeholder="Calza" className="border p-2 rounded" />
          <input type="text" placeholder="Tapa Dren" className="border p-2 rounded" />
        </div>
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
  );
};

export default Formulary;
