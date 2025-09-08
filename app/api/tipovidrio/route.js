import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [tipovidrio] = await pool.query(`
        SELECT 
        v.id,
        v.tipo_vidrio
      FROM tipo_vidrio v
    `);

    return NextResponse.json(tipovidrio, {status: 200})
  }catch(e){
    console.error("Error, ha ocurrido un error!!", e)
    return NextResponse.json({error: "Error al obtener los tipos de vidrio"}, {status: 500})
  }
}