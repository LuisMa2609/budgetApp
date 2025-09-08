'use client';
import { useState, useEffect } from "react";

function history () {
  const [budgets, setBudgets] = useState([]);
  useEffect(() => {
    const fetchAllbudgets = async ()=> {
      try{
        const res = await fetch('/api/budgets');
        const data = await res.json();
        setBudgets(data)
      }catch(error){
        console.log("Error al cargar presupuestos", error)
      }
    }
    fetchAllbudgets()
  }, [])
  
    useEffect(() => {
    console.log("Budgets cargados:", budgets);
    })
  

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="w-full mt-8">
        <h1 className="text-2xl font-semibold mb-4">Historial de presupuestos</h1>
        <div className="flex flex-col border rounded shadow-md">
          <div className="flex justify-between items-center p-4 border-b last:border-none">
            <span>Cotización ejemplo</span>
            <div className="flex gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Editar
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                Ver
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 border-b last:border-none">
            <span>Cotización ejemplo2</span>
            <div className="flex gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Editar
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                Ver
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center p-4">
            <span>Cotización ejemplo3</span>
            <div className="flex gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Editar
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default history