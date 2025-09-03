import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [tiposatin] = await pool.query(`
        SELECT 
        s.id,
        s.tipo_satin
      FROM tipo_satin s
    `);

    return NextResponse.json(tiposatin, {status: 200});
    
  }catch(e){
    console.error("Error, ha ocurrido un error en tipos de satin!!", e)
    return NextResponse.json({ error: "Error al obtener los presupuestos"}, {status: 500});
  }
}