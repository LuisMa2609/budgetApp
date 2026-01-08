'use client'
import { useState, useEffect} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Formulary  from "./Formulary";

function AddFormView() {
  const [fetchedData, setFetchedData] = useState({
    perfiles: [],
    herrajes: [],
    lineas: [],
    tipoAluminio: [],
    tipoSatin: [],
    tipoVidrio: []
  });

  const [formData, setFormData] = useState([{
    id: 1,
    Titulo: "",
    linea: "",
    aluminio: "",
    satin:"",
    vidrio: "",
    perfiles: [],
    herrajes: []
  }])

  //Fetch data from APIs
  useEffect(() => {
    let isMounted = true;
    async function fetchData(){
      try{
        const [perfilesRes, herrajesRes, lineasRes, tipoaluminioRes, tiposatinRes, tipovidrioRes] = await Promise.all([
          fetch('/api/perfiles'),
          fetch('/api/herrajes'),
          fetch('/api/linea'),
          fetch('/api/tipoaluminio'),
          fetch('/api/tiposatin'),
          fetch('/api/tipovidrio'),
        ]);
        
        if(!perfilesRes.ok || !herrajesRes.ok || !lineasRes.ok || !tipoaluminioRes.ok || !tiposatinRes.ok || !tipovidrioRes.ok){
          throw new Error("Error en una o mas peticiones");
        }
        
      const [perfilesData, herrajesData, lineasData, aluminioData, satinData, vidrioData] = await Promise.all([
        perfilesRes.json(),
        herrajesRes.json(),
        lineasRes.json(),
        tipoaluminioRes.json(),
        tiposatinRes.json(),
        tipovidrioRes.json()
      ]);

      if(isMounted){
        setFetchedData({
          ...fetchedData,
          perfiles: perfilesData,
          herrajes: herrajesData,
          lineas: lineasData,
          tipoAluminio: aluminioData,
          tipoSatin: satinData,
          tipoVidrio: vidrioData
        });
      }
        
      }catch(error){
        console.log("Error al cargar los datos: ", error);
      }
    }
    fetchData();

    return () => { isMounted = false; };
  }, [])

  //Handle input changes
  const validateForm = () => {

    for( const data of formData){
      for(const [key, value] of Object.entries(data)){
        if( (value === "" || value === null ) && !["satin", "vidrio"].includes(key) || (["perfiles", "herrajes"].includes(key) && Object.keys(value).length== 0 )) {
          console.log(key, "is empty, check that");
          return {valid: false, field: key, message: `El campo ${key} esta vacio, favor de llenarlo`}
        }
      }
    }
    return {valid: true};
  }
  
  async function saveFunction() {
    const validation = validateForm();
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    try{
      const res = await fetch('/api/trabajos', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // const data = await res.json();
      if( res.status == 500){
        console.log("Guardado no exitoso")
        alert("Guardado no exitoso, checar consola");
      }else if( res.status == 200){
        console.log("Guardado exitoso")
        alert("Guardado exitoso");
      }

      setFormData([{
        Titulo: "",
        linea: "",
        aluminio: "",
        satin:"",
        vidrio: "",
        perfiles: [],
        herrajes: []
      }]);

    }catch(error){
      console.log("Error at uploading trabajo", error)
      
    }
  }
    
  // useEffect(() => {
  //   console.log("Form Data updated: ", formData);
  // }, [formData]);

  return (
    <main className="container mx-auto px-4 py-6">

      {formData.map(form => (
        <div key={form.id}> 

          <Formulary 
          form={form}
          fetchedData={fetchedData}
          />
        
        </div>
      ))}
      
      <div className="mt-7 justify-end">
        <div className="flex items-center gap-2">
          <Button 
            type="button"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            onClick={saveFunction}
          >
            Guardar
          </Button>
        </div>
      </div>
    </main>
  );
}

export default AddFormView;