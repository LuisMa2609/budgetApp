'use client'
import { useState, useEffect, use } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

function AddFormView() {
  const [perfiles, setPerfiles] = useState([]);
  const [herrajes, setHerrajes] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [tipoaluminio, setTipoAluminio] = useState([]);
  const [tiposatin, setTipoSatin] = useState([]);
  const [tipovidrio, setTipoVidrio] = useState([]);
  const [numPerfil, setNumPerfil] = useState([1]);
  const [numHerraje, setNumHerraje] = useState([1]);

  const [formData, setFormData] = useState({})

  useEffect(() => {
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
        const perfilesData = await perfilesRes.json();
        const herrajesData = await herrajesRes.json();
        const lineasData = await lineasRes.json()
        const aluminioData = await tipoaluminioRes.json();
        const satinData = await tiposatinRes.json();
        const vidrioData = await tipovidrioRes.json();
        setPerfiles(perfilesData);
        setHerrajes(herrajesData);
        setLineas(lineasData);
        setTipoAluminio(aluminioData);
        setTipoSatin(satinData);
        setTipoVidrio(vidrioData);
        
      }catch(error){
        console.log("Error al cargar los datos: ", error);
      }
    }
    fetchData();
  }, [])

  const handleInputChange = (e) => {
    const target = e?.target;
    const value = parseInt(target.value)

    if (value == "0") {
      setFormData(prevForm => {
        const deleteObj = {...prevForm.target.id};
        delete deleteObj[target.id]
        return{
          ...prevForm,
          [target.id]: deleteObj
        }
      })
      return;
    }
    
    if(target.id == "perfil" || target.id == "herraje"){
      setFormData(prevForm => {
        const key = target.id === 'perfil' ? 'perfiles' : 'herrajes';
        return {
          ...prevForm,
          [key]: {
            ...(prevForm[key]),
            [target.num]: target.value
          }
        };
      });
    }else{
    setFormData(prevForm => ({
      ...prevForm,
      [target.id]: value
    }))
    }
  }
  
  const handleTituloChange = (e)=>{
    const value = e.target.value;

    setFormData(prevForms =>({
      ...prevForms,
        TituloTrabajo: value
      }));
  }
  
  const addPerfil = () =>{
    setNumPerfil(prevNumPerfil => [
      ...prevNumPerfil,
      prevNumPerfil.length + 1
    ])
  }

  const addHerraje = () =>{
    setNumHerraje(prevNumHerraje => [
      ...prevNumHerraje,
      prevNumHerraje.length + 1
    ])
  }
  
  useEffect(() => {
    console.log("Data: ", formData);
  },[formData]);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex  items-center gap-4 mb-6">
        <div className="relative w-[400px]">
            <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.tittle} onChange={handleTituloChange} />
            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nombre:</label> 
        </div>
      </div>

      <form className="border p-6 rounded shadow space-y-6">
        {/* Select Línea */}
        <div className="w-[400px]">
          <Select value={formData.linea || ''} onValueChange={(value) => handleInputChange({ target: { id: "linea", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona Línea" />
            </SelectTrigger>
            <SelectContent>
              {lineas.map(({ id, linea }) => (
                <SelectItem key={id} value={id}>
                  {linea}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="relative w-[400px]">
          <select id="select_perfiles" defaultValue="" 
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                    rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="0"></option>
            {lineas.map((linea) => (
              <option key={linea.id} value={linea.linea}>
                {linea.linea}
              </option>
            ))}
          </select>
          <label
            htmlFor="select_perfiles"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
                    scale-75 top-2 z-0 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 
                    peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                    peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1"
          >
            Linea
          </label>
        </div> */}

        <div className="w-[400px]">
          <Select value={formData.aluminio || ''} onValueChange={(value) => handleInputChange({ target: { id: "aluminio", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona tipo de aluminio" />
            </SelectTrigger>
            <SelectContent>
              {tipoaluminio.map(({ id, tipo_aluminio }) => (
                <SelectItem key={id} value={id}>
                  {tipo_aluminio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[400px]">
          <Select value={formData.satin || ''} onValueChange={(value) => handleInputChange({ target: { id: "satin", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona tipo de satin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='0'> </SelectItem>
              {tiposatin.map(({ id, tipo_satin }) => (
                <SelectItem key={id} value={id}>
                  {tipo_satin}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[400px]">
          <Select value={formData.vidrio || ''} onValueChange={(value) => handleInputChange({ target: { id: "vidrio", value } })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona tipo de vidrio" />
            </SelectTrigger>
            <SelectContent>
              {tipovidrio.map(({ id, tipo_vidrio }) => (
                <SelectItem key={id} value={id}>
                  {tipo_vidrio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
          <div className="flex gap-2">

          {numPerfil.map(numperfil => (
            // <h1 key={numperfil}>{numperfil}</h1>
            
            <div className="relative w-[400px]" key={numperfil}>

              <Select onValueChange={(value) => handleInputChange({target: {id: "perfil",num: numperfil , value}})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Perfiles" />
                </SelectTrigger>
                <SelectContent>
                  {perfiles.map((perfil) => (
                    <SelectItem value={perfil.perfil_id} key={perfil.perfil_id}>{perfil.perfil_id} | {perfil.perfil_nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* <select
                id="select_perfiles"
                defaultValue=""
                onValueChange={(value) => handleInputChange({ target: { id: "perfil" + {numperfil}, value } })}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                       rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                       dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="0" >Perfiles</option>
                {perfiles.map((perfil) => (
                  <option value={perfil.perfil_id} key={perfil.perfil_id}>{perfil.perfil_id} | {perfil.perfil_nombre}</option>
                ))}
                <option value="perfil1">Perfil 1</option>
                <option value="perfil2">Perfil 2</option>
              </select> */}
              <label
                htmlFor="select_perfiles"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
                       scale-75 top-2 z-0 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                       peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                       rtl:peer-focus:left-auto start-1"
              >
                Perfil
              </label>
            </div>
            
          ))}
          
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
              aria-label="Agregar perfil"
              onClick={addPerfil}
            >
              <FaPlus size={16} />
            </Button>
          </div>
        </div>

        {/* Herrajes y accesorios */}
        <div>
          <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
          <div className="flex gap-2">
            {numHerraje.map(numherraje => (

            <div className="relative w-[400px]" key={numherraje}>

              <Select onValueChange={(value) => handleInputChange({target: {id: "herraje", num: numherraje, value}})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Herrajes y accesorios" />
                </SelectTrigger>
                <SelectContent>
                  {herrajes.map((herraje) => (
                    <SelectItem value={herraje.herraje_id} key={herraje.herraje_id}>{herraje.herraje_id} | {herraje.herraje_nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

            
              {/* <select
                id="select_herrajes"
                defaultValue=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                       rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                       dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="0">Opciones</option>
                {herrajes.map((herraje) => (
                  <option value={herraje.herraje_id} key={herraje.herraje_id}>{herraje.herraje_id} | {herraje.herraje_nombre}</option>
                ))}
              </select> */}
              <label
                htmlFor="select_herrajes"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
                       scale-75 top-2 z-0 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                       peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                       rtl:peer-focus:left-auto start-1"
              >
                Herraje
              </label>
            </div>

            ))}


            <Button
              type="button"
              variant="outline"
              size="icon"
              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
              aria-label="Agregar herraje"
              onClick={addHerraje}
            >
              <FaPlus size={16} />
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default AddFormView;