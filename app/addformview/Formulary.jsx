'use client';
import { useState, useEffect, React} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const Formulary = ({ form, fetchedData}) => {
    
    const {perfiles, herrajes, lineas, tipoAluminio, tipoSatin, tipoVidrio} = fetchedData;
    const [numItems, setNumItems] = useState({
        perfiles: [1],
        herrajes: [1]
    });
    const [formData, setFormData] = useState(form);
    // console.log("Formulary form prop: ", formData);

    // useEffect(() => {
    //     setFormData([form])
    // },[form])

    useEffect(() => {
        console.log(typeof formData, formData);
    })
    
  const handleInputChange = (e) => {
    const target = e?.target;
    const {id} = target;
  //Form array update

    if(id == "perfil" || id == "herraje"){
        const key = id === 'perfil' ? 'perfiles' : 'herrajes';
        const updatedData = ({
            ...formData,
            [key]: {
                ...(formData[key]),
                [target.num]: target.value
            }
            })

        return setFormData(updatedData);
    }

    const value = Number.parseInt(target.value, 10)    
    const updatedFields = ({
        ...formData,
        [id]: value
    }) 

    return setFormData(updatedFields);
  
    // setFormData(prevForm => {
    //   const {id} = target;

    //   if(id == "perfil" || id == "herraje"){
    //     const key = id === 'perfil' ? 'perfiles' : 'herrajes';
    //     const updatedData = (
    //       prevForm.map(form => ({
    //         ...form,
    //         [key]: {
    //           ...(form[key]),
    //           [target.num]: target.value
    //         }
    //       }))
    //     )
    //     return updatedData;
    //   }
    //   const value = Number.parseInt(target.value, 10)

    //     const updatedData = (
    //       prevForm.map(form => ({
    //         ...form,
    //         [id]: value
    //       }))
    //     )

    //   return updatedData;
    // })
  };
  
  const handleTituloChange = (e)=>{
    const value = e.target.value;

    const updatedFields = ({
        ...formData,
        Titulo: value
    });
    
    console.log("Updated Data:", updatedFields);

    setFormData(updatedFields);

    // setFormData(prevForms =>
    //   prevForms.map(formdata => ({
    //     ...formdata,
    //     Titulo: value
    //   }))
    // );
  }
  
  const addItem = (type) => {
    setNumItems(prevNumItems => ({
      ...prevNumItems,
      [type]: [...prevNumItems[type], prevNumItems[type].length + 1]
    }));
  }


    return(
        <main>

            <div className="flex  items-center gap-4 mb-6">
                <div className="relative w-[400px]">
                    <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData.Titulo || ''} onChange={handleTituloChange} />
                    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Titulo de trabajo:</label> 
                </div>
            </div>

            <form className="border p-6 rounded shadow space-y-6">
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

                <div className="w-[400px]">
                    <Select value={formData.aluminio || ''} onValueChange={(value) => handleInputChange({ target: { id: "aluminio", value } })}>
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
                    <Select value={formData.satin || ''} onValueChange={(value) => handleInputChange({ target: { id: "satin", value } })}>
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
                    <Select value={formData.vidrio || ''} onValueChange={(value) => handleInputChange({ target: { id: "vidrio", value } })}>
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

        </main>
    )
}

export default Formulary;