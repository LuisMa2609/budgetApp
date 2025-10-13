'use client';
import { MdDeleteOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

function history (){
const [budgets, setBudgets] = useState([]);
const router = useRouter();

 useEffect(() => {
    async function fetchData(){ 
      try{
        const [budgetsRes] = await Promise.all([
          fetch('/api/budgets')
        ]);
        const budgetsData = await budgetsRes.json(); 
        setBudgets(budgetsData);
      }catch(error){
        console.log("Eror al cargar los datos", error)
      }
    } fetchData();
  }, [])

function handleEdit(id){
  console.log("Editar presupuesto con ID:", id);
   router.push(`/?editId=${id}`);
}

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="w-full mt-8">
        <h1 className="text-2xl font-semibold mb-4">Historial de presupuestos</h1>
        <div className="flex flex-col border rounded shadow-md">
          {budgets.map(budget =>(
          <div key={budget.id} className="flex justify-between items-center p-4 border-b last:border-none">
            <span>Cotización de {budget.cliente}</span>
            <div className="flex gap-2">
              <button className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-4 py-3 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-700 transition">
                <MdDeleteOutline />
              </button>
              <button onClick={() => handleEdit(budget.id)} className="text-orange-500 hover:text-white border border-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded text-sm px-4 py-2 text-center me-2 mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-700 transition">
                <FaRegEdit /> - {budget.id}
              </button>
              <button className="text-gray-500 hover:text-white border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 text-center me-2 mb-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700 transition">
                <FaRegEye />
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default history