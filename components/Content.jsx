'use client'
import Formulary from "./Formulary";
import { useState, useEffect } from "react";
import TopDown from "./TopDown";
import CustomInput from "./assets/CustomInput";

const Content = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [nextFormId, setNextFormId] = useState(2);
  const [lineas, setLineas] = useState([]);
  const [tipoAluminio, setTipoAluminio] = useState([]);
  const [tipoSatin, setTipoSatin] = useState([]);
  const [tipoVidrio, setTipoVidrio] = useState([]);
  const [formsData, setFormsData] = useState([
    {id: 1, trabajoId: null, cliente: null , formfields: {
        trabajoId: null,
        nombreTrabajo: '',
        herrajes: {},
        perfiles: {}
    }}
  ])

  useEffect(() => {
    async function fetchData(){ 
      try{
        const [trabajosRes, lineaRes, tipoAlumRes, tipoSatinRes, tipoVidrioRes] = await Promise.all([
          fetch('/api/trabajos'),
          fetch('/api/linea'),
          fetch('/api/tipoaluminio'),
          fetch('/api/tiposatin'),
          fetch('/api/tipovidrio')
        ]);
        const trabajosData = await trabajosRes.json();
        const lineaData = await lineaRes.json();
        const tipoAlumData = await tipoAlumRes.json();
        const tipoSatinData = await tipoSatinRes.json();
        const tipoVidrioData = await tipoVidrioRes.json();
        setTrabajos(trabajosData);
        setLineas(lineaData);
        setTipoAluminio(tipoAlumData);
        setTipoSatin(tipoSatinData);
        setTipoVidrio(tipoVidrioData);
      }catch(error){
        console.log("Eror al cargar los datos", error)
      }
    } fetchData();
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
  
  async function guardarFn(){
      try{
        const res = await fetch('/api/budgets', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(formsData)
        });
        const data = await res.json();
        if( res.status){
          console.log("Guardado exitosamente")
        }
        console.log(data)
      }catch(error){
        console.log("Error al cargar trabajos", error)
      }
  }

  function handleCustomer(e) {
    const value = e.target.value;

    setFormsData(prevForms =>
      prevForms.map(form => ({
        ...form,
        cliente: value
      }))
    );
  }
  
  // useEffect(() => {
  //   console.log(formsData);
  // }, [formsData])

  //   useEffect(() => {
  //   console.log({trabajos, lineas, tipoAluminio, tipoSatin, tipoVidrio });
  // })
  
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex  items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cliente</h1>
        <div className="relative w-[400px]">
            <CustomInput label="Presupuesto" name="cliente" value={formsData.cliente} onChange={handleCustomer} />
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
          lineas = {lineas}
          tipoAluminio = {tipoAluminio}
          tipoSatin = {tipoSatin}
          tipoVidrio = {tipoVidrio}
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
