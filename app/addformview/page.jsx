import { FaPlus } from "react-icons/fa6";

function addFormView() {
  return (
    <main className="container mx-auto px-4 py-6">

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-[400px]">
          <input
            type="text"
            id="floating_outlined"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined" 
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Nombre:
          </label>
        </div>
      </div>

      <form className="border p-6 rounded shadow space-y-6">

         <div className="relative w-[400px]">
              <select
                id="select_perfiles"
                defaultValue=""
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                       rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                       dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="" disabled>Opciones</option>
                <option value="perfil1">Linea 1</option>
                <option value="perfil2">Linea 2</option>
              </select>
              <label
                for="select_perfiles"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
                       scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                       peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                       rtl:peer-focus:left-auto start-1"
              >
                Linea
              </label>
            </div>


        <div>
          <h2 className="font-bold mt-4 mb-2">PERFILES DE ALUMINIO</h2>
          <div className="flex gap-2">
            <div className="relative w-[400px]">
              <select
                id="select_perfiles"
                defaultValue=""
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                       rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                       dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="" disabled>Opciones</option>
                <option value="perfil1">Perfil 1</option>
                <option value="perfil2">Perfil 2</option>
              </select>
              <label
                for="select_perfiles"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
                       scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                       peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                       rtl:peer-focus:left-auto start-1"
              >
                Perfil
              </label>
            </div>

            <button
              type="button"
              className="text-green-500 hover:text-white border border-green-500 hover:bg-green-700 focus:ring-2 
              focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center 
              dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 
              dark:focus:ring-green-800"
            >
              <FaPlus size={14} />
            </button>
          </div>
        </div>

        <div>
          <h2 className="font-bold mt-4 mb-2">HERRAJES Y ACCESORIOS</h2>
          <div className="flex gap-2">
            <div className="relative w-[400px]">
              <select
                id="select_herrajes"
                defaultValue=""
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                       rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                       dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="" disabled>Opciones</option>
                <option value="herraje1">Herraje 1</option>
                <option value="herraje2">Herraje 2</option>
              </select>
              <label
                for="select_herrajes"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
                       scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                       peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                       peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                       rtl:peer-focus:left-auto start-1"
              >
                Herraje
              </label>
            </div>

            <button
              type="button"
              className="text-green-500 hover:text-white border border-green-500 hover:bg-green-700 focus:ring-2 
              focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center 
              dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 
              dark:focus:ring-green-800"
            >
              <FaPlus size={14} />
            </button>
          </div>
        </div>

      </form>
    </main>
  );
}

export default addFormView;
