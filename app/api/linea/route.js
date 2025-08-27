import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [rows] = await pool.query(`
        SELECT 
        l.id,
        l.linea,
        l.pulgadas
      FROM linea l
      `);
        }catch(e){
    console.error("Error, ha ocurrido un error!!", e)
  }
}