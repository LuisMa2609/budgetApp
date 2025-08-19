// import the Request and Response classes
import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

// define and export the GET handler function

export async function GET(request) {
  // this is going to be my JSON response
  
  try{
    const [rows] = await pool.query(`
            SELECT 
        p.id AS perfil_id,
        p.nombre AS perfil_nombre
      FROM perfilesaluminio p
      `);
      
    return Response.json(rows);
  }catch(e){
    console.error("Error, ha ocurrido un error!!", e)
  }

  // const results = {
  //   message: 'Hello World!',
  // }

  // response with the JSON object

  return NextResponse.json(results)
}