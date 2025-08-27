import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  
  try{
    const [rows] = await pool.query(`
        SELECT 
        v.id,
        v.tipo_vidrio
      FROM tipo_vidrio v
      `);
        }catch(e){
    console.error("Error, ha ocurrido un error!!", e)
  }
}