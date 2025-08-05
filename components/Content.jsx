'use client'
import Formulary from "./Formulary";
import { useState, useEffect } from "react";
import TopDown from "./TopDown";
import CustomInput from "./assets/CustomInput";

const Content = () => {
  const [formsData, setFormsData] = useState([
    {id: 1, trabajoId: null, formfields: {
        trabajoId: null,
        nombreTrabajo: '',
        herrajes: {},
        perfiles: {}
    }}
  ])
  const [trabajos, setTrabajos] = useState([]);

  const [nextFormId, setNextFormId] = useState(2);

  useEffect(() => {
    const fetchAllTrabajos = async ()=> {
      try{
        const res = await fetch('/api/trabajos');
        const data = await res.json();
        setTrabajos(data)
      }catch(error){
        console.log("Error al cargar trabajos", error)
      }
    }
    fetchAllTrabajos()
  }, [])
  
  function addForm(){
    setFormsData(prevForms => [
      ...prevForms,
      {id: nextFormId, trabajoId: null, formfields:{
        trabajoId: null,
        nombreTrabajo: '',
        herrajes: {},
        perfiles: {}
       }}
    ]);
    setNextFormId(prevId => prevId + 1)
  }

  function deleteForm(formId){
    if (formsData.length>1){
      console.log("deleteForm",formId)
      setFormsData(prevForms => {
        return prevForms.filter (form => form.id !== formId)
      });
    }else{
      console.log("Ya es todo");
    }
  }

  function handleFormData(formId, formFields) {
    setFormsData(prevForms =>
      prevForms.map(form =>
        form.id === formId
          ? { ...form, trabajoId: formFields.trabajoId ,formfields: { ...formFields } }
          : form
      )
    );
}
  
  function guardarFn(){
    console.log("guardar: ", formsData)
  }
  
  useEffect(() => {
    console.log(formsData)
  }, [formsData])
  
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex  items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cliente</h1>
        <div className="relative w-[400px]">
            <CustomInput label="Presupuesto" name="cliente" value="" onChange={() => {}} />
            {/* <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Presupuesto:</label> */}
        </div>
      </div>

      <div>Contador de forms: {formsData.length}</div>  

      {formsData.map(formItem => (
        <Formulary 
          dataFields ={ formItem.formfields }
          trabajos={trabajos}
          formLength={formsData.length}
          deleteForm={deleteForm}
          key={formItem.id}
          formId = {formItem.id}
          onDataChange={handleFormData}
        />
      ))}
      
      <TopDown 
        guardarFn={guardarFn}
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
