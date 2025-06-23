// import the Request and Response classes
import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

// define and export the GET handler function

export async function GET(request) {
  // this is going to be my JSON response
  
  try{
    const [rows] = await pool.query(`
            SELECT 
        c.id AS catalogo_id,
        c.nombre AS nombre_catalogo,
        c.linea,
        h.id as herrajeaccesorio_id,
        h.nombre as herrajes_accesorios,
        p.id as perfil_id,
        p.nombre as perfil_nombre
      FROM catalogo c
      LEFT JOIN relcat_herrajeaccesorio rh ON c.id = rh.catalogo_id
      LEFT JOIN herrajesaccesorios h ON rh.herrajeaccesorio_id = h.id
      LEFT JOIN relcat_perfiles rp ON c.id = rp.catalogo_id
      LEFT JOIN perfilesaluminio p ON rp.perfil_id = p.id
      `);

      const catalogoMap = new Map();

      for (const row of rows) {
        if (!catalogoMap.has(row.catalogo_id)) {
          catalogoMap.set(row.catalogo_id, {
            id: row.catalogo_id,
            nombre: row.nombre_catalogo,
            linea: row.linea,
            herrajes: [],
            perfiles: []
          });
        }

  const item = catalogoMap.get(row.catalogo_id);

    if (row.herrajeaccesorio_id && !item.herrajes.find(h => h.id === row.herrajeaccesorio_id)) {
      item.herrajes.push({
        id: row.herrajeaccesorio_id,
        nombre: row.herrajes_accesorios
      });
    }

    if (row.perfil_id && !item.perfiles.find(p => p.id === row.perfil_id)) {
      item.perfiles.push({
        id: row.perfil_id,
        nombre: row.perfil_nombre
      });
    }
  }

  const catalogos = Array.from(catalogoMap.values());
      
    return Response.json(catalogos);
  }catch(e){
    console.error("Error", e)
  }

  // const results = {
  //   message: 'Hello World!',
  // }

  // response with the JSON object

  return NextResponse.json(results)
}