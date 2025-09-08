import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [tipoaluminios] = await pool.query(`
        SELECT 
        a.id,
        a.tipo_aluminio
      FROM tipo_aluminio a
      `);

    return NextResponse.json(tipoaluminios, {status: 200})
  }catch(e){
    console.error("Error, ha ocurrido un error en los tipos de aluminios!!", e)
    return NextResponse.json({ error: "Error al obtener los tipos de aluminios"}, {status: 500});
  }
}