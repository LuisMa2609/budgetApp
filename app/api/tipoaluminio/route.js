import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [rows] = await pool.query(`
        SELECT 
        a.id,
        a.tipo_aluminio
      FROM tipo_aluminio a
      `);
        }catch(e){
    console.error("Error, ha ocurrido un error!!", e)
  }
}