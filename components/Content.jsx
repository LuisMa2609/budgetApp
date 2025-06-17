'use client'
import Formulary from "./Formulary";
import { useState, useEffect } from "react";
import TopDown from "./TopDown";

const Content = () => {
  const [formsData, setFormsData] = useState([
    {id: 1, trabajoId: null, formfields: {}}
  ])
  const [nextFormId, setNextFormId] = useState(2);

function addForm(){
  setFormsData(prevForms => [
    ...prevForms,
    {id: nextFormId, trabajoId: null, formfields:{}}
  ]);
  setNextFormId(prevId => prevId + 1)
  console.log(formsData);
}

  function deleteForm(){
    if (formsData.length>1){
      setFormData(prevForms => prevForms.slice(0, -1));
      // console.log(formsData);
    }else{
      console.log("Ya es todo");
    }
  }
  
  function handleFormData(formFieldsData){
    console.log(formFieldsData);

  }
  
  useEffect(() => {
    console.log("formsData updated:", formsData);
    console.log("formsData length:", formsData.length);
  }, [formsData])
  
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cliente</h1>
        <input
          type="text"
          placeholder="Presupuesto"
          className="border p-2 rounded w-[400px]"
        />
      </div>

      <div>Contador de forms: {formsData.length}</div>

      {formsData.map(formData => (
        <Formulary 
          key={formData.id}
          formId = {formData.id}
          onDataChange={handleFormData}
        />
      ))}
      
      <TopDown 
        formLength={formsData.length}
        newForm = {addForm}
      />

      {/* <span>{formsData.length}</span> */}
      {/* <br />
       <button type="button" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition" onClick={addForm}>Agregar</button>
       <br />
       {
        formsData.length > 1 && (
          <button type="button" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition" onClick={deleteForm}>Quitar</button>
        )
       } */}
    </main>
  );
};

export default Content;
