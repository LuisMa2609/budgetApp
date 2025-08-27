import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [rows] = await pool.query(`
        SELECT 
        s.id,
        s.tipo_satin
      FROM tipo_satin s
      `);
        }catch(e){
    console.error("Error, ha ocurrido un error!!", e)
  }
}