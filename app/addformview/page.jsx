'use client'
import { useState, useEffect} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

function AddFormView() {
  const [perfiles, setPerfiles] = useState([]);
  const [herrajes, setHerrajes] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [tipoAluminio, setTipoAluminio] = useState([]);
  const [tipoSatin, setTipoSatin] = useState([]);
  const [tipoVidrio, setTipoVidrio] = useState([]);
  const [numItems, setNumItems] = useState({
    perfiles: [1],
    herrajes: [1]
  });

  const [formData, setFormData] = useState([{
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

  //Handle input changes
  const handleInputChange = (e) => {
    const target = e?.target;
  //Form array update
    setFormData(prevForm => {
      const {id} = target;

      if(id == "perfil" || id == "herraje"){
        const key = id === 'perfil' ? 'perfiles' : 'herrajes';
        const updatedData = (
          prevForm.map(form => ({
            ...form,
            [key]: {
              ...(form[key]),
              [target.num]: target.value
            }
          }))
        )
        return updatedData;
      }
      const value = Number.parseInt(target.value, 10)

        const updatedData = (
          prevForm.map(form => ({
            ...form,
            [id]: value
          }))
        )

      return updatedData;
    })
  };
  
  const handleTituloChange = (e)=>{
    const value = e.target.value;

    setFormData(prevForms =>
      prevForms.map(formdata => ({
        ...formdata,
        Titulo: value
      }))
    );
  }
  
  const addItem = (type) => {
    setNumItems(prevNumItems => ({
      ...prevNumItems,
      [type]: [...prevNumItems[type], prevNumItems[type].length + 1]
    }));
  }
  
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
    
  useEffect(() => {
    console.log("Data: ", formData);
  },[formData]);

  return (
    <main className="container mx-auto px-4 py-6">

      {formData.map((form, index) => (
        <div key={index}> 
        
        <div className="flex  items-center gap-4 mb-6">
          <div className="relative w-[400px]">
              <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={form.Titulo || ''} onChange={handleTituloChange} />
              <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Titulo de trabajo:</label> 
          </div>
        </div>

        <form className="border p-6 rounded shadow space-y-6">
          {/* Select Línea */}
          <div className="w-[400px]">
            <Select value={form.linea || ''} onValueChange={(value) => handleInputChange({ target: { id: "linea", value } })}>
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

          <div className="w-[400px]">
            <Select value={form.aluminio || ''} onValueChange={(value) => handleInputChange({ target: { id: "aluminio", value } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona tipo de aluminio" />
              </SelectTrigger>
              <SelectContent>
                {tipoAluminio.map(({ id, tipo_aluminio }) => (
                  <SelectItem key={id} value={id}>
                    {tipo_aluminio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[400px]">
            <Select value={form.satin || ''} onValueChange={(value) => handleInputChange({ target: { id: "satin", value } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona tipo de satin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='0'> No aplica</SelectItem>
                {tipoSatin.map(({ id, tipo_satin }) => (
                  <SelectItem key={id} value={id}>
                    {tipo_satin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[400px]">
            <Select value={form.vidrio || ''} onValueChange={(value) => handleInputChange({ target: { id: "vidrio", value } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona tipo de vidrio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='0'> No aplica</SelectItem>
                {tipoVidrio.map(({ id, tipo_vidrio }) => (
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

            {numItems.perfiles.map(numperfil => (
              
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
                onClick={() => addItem('perfiles')}
              >
                <FaPlus size={16} />
              </Button>
            </div>
          </div>

          {/* Herrajes y accesorios */}
          <div>
            <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
            <div className="flex gap-2">
              {numItems.herrajes.map(numherraje => (

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
                onClick={() => addItem('herrajes')}
              >
                <FaPlus size={16} />
              </Button>
            </div>
          </div>
        </form>

        
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