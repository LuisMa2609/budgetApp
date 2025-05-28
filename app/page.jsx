'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const[trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    fetch('/api/trabajos')
    .then(res => res.json())
    .then(data => setTrabajos(data))
  }, [])
  
  console.log("trabajos", trabajos);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1>Lista</h1>
        {/* <ul> */}
          {trabajos.map((t, i) => (
        // <input key={i}>id: {t.catalogo_id} | Nombre: {t.nombre_catalogo} Linea: {t.linea} {t.herrajes_accesorios} {t.perfiles_aluminio}</input>
            <input type="text" key={i} placeholder={t.nombre} className="border p-2 rounded"/>
          ))}
        {/* </ul> */}

          {/* <form action="{add}">
            <input name="query" style={{backgroundColor:'yellow'}}/>
            <button type="submit">Add</button>
          </form> */}
        
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >

          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >

          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
