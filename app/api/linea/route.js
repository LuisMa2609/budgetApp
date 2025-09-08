import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [lineas] = await pool.query(`
        SELECT 
        l.id,
        l.linea,
        l.pulgadas
      FROM linea l
      `);

  return NextResponse.json(lineas, {status: 200})

  }catch(e){
    console.error("Error, ha ocurrido un error en las lineas!!", e)
    return NextResponse.json({ error: "Error al obtener las lineas"}, {status: 500});
  }

}