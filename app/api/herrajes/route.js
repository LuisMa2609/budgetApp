// import the Request and Response classes
import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

// define and export the GET handler function

export async function GET(request) {
  // this is going to be my JSON response
  
  try{
    const [rows] = await pool.query(`
            SELECT 
        h.id AS herraje_id,
        h.nombre AS herraje_nombre
      FROM herrajesaccesorios h
      `);
      
    return Response.json(rows);
  }catch(e){
    console.error("Error, ha ocurrido un error!!", e)
  }

  return NextResponse.json(results)
}