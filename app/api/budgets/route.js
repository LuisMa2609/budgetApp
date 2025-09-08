// import the Request and Response classes
import pool from '@/app/lib/mysql';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request){
  
  try {
    const [rows] = await pool.query(`
      SELECT 
      p.id AS id,
      p.customer AS cliente,
      p.linea AS linea,
      p.nombreTrabajo AS nombreTrabajo,
      p.tipoALuminio AS tipoALuminio,
      p.tipoSatin AS tipoSatin,
      p.tipoVidrio AS tipoVidrio,
      p.trabajo_id AS trabajoId,
      h.id as herrajeaccesorio_id,
      h.nombre as herrajes_accesorios,
      pr.id as perfil_id,
      pr.nombre as perfil_nombre
      FROM presupuesto p 
      LEFT JOIN rel_presupuesto_herrajes rph ON p.id = rph.presupuesto_id
      LEFT JOIN herrajesaccesorios h ON rph.herraje_id = h.id
      LEFT JOIN rel_presupuesto_perfiles rpp ON p.id = rpp.presupuesto_id
      LEFT JOIN perfilesaluminio pr ON rpp.perfil_id = pr.id
      `);

      const presupuestoMap = new Map();

      for (const row of rows) {
        if (!presupuestoMap.has(row.id)) {
          presupuestoMap.set(row.id, {
            id: row.id,
            cliente: row.cliente,
            linea: row.linea,
            nombreTrabajo: row.nombreTrabajo,
            tipoALuminio: row.tipoALuminio,
            tipoSatin: row.tipoSatin,
            tipoVidrio: row.tipoVidrio,
            trabajoId: row.trabajoId,
            herrajes: [],
            perfiles: []
          });
        }

      const item = presupuestoMap.get(row.id);

        if (row.herrajeaccesorio_id && !item.herrajes.find(h => h.id === row.herrajeaccesorio_id)) {
          item.herrajes.push({
            id: row.herrajeaccesorio_id,
            nombre: row.herrajes_accesorios
          });
        }
      
        if (row.perfil_id && !item.perfiles.find(p => p.id === row.perfil_id)) {
          item.perfiles.push({
            id: row.perfil_id,
            nombre: row.perfil_nombre
          });
        } 
      }

      const budgets = Array.from(presupuestoMap.values());
      // console.log(budgets);
    return NextResponse.json(budgets, {status: 200});

  } catch (error){
    console.error("Error al obtener los presupuestos:", error);
    return NextResponse.json({ error: "Error al obtener los presupuestos"}, {status: 500});
  }

}

export async function POST(NextRequest){
  const formsData = await NextRequest.json();
  // Iterate over each item in the formsData array
  for(const item of formsData){
    const trabajoId = item.trabajoId;
    const customer = item.cliente;
    const {
      nombreTrabajo,
      herrajes,
      perfiles,
      linea,
      tipoAluminio,
      tipoVidrio,
      tipoSatin
    } = item.formfields;

      try {
    const [result] = await pool.query(
      "INSERT INTO presupuesto (trabajo_Id, customer, nombreTrabajo, linea, tipoAluminio, tipoVidrio, tipoSatin) VALUE (?, ?, ?, ?, ?, ?, ?)",
      [trabajoId, customer, nombreTrabajo, linea, tipoAluminio, tipoVidrio, tipoSatin]
    );

    const presupuestoId = result.insertId; 
     // Iterate over herrajes object
    for (const [key, value] of Object.entries(herrajes)) {
      const quantity = value
      const herraje_id = key;
      const [result] = await pool.query(
      "INSERT INTO rel_presupuesto_herrajes (presupuesto_id, herraje_id, quantity) VALUE (?, ?, ?)",
      [presupuestoId, herraje_id, quantity]);
    }

    for (const [key, value] of Object.entries(perfiles)) {
      const quantity = value
      const perfil_id = key;
      const [result] = await pool.query(
      "INSERT INTO rel_presupuesto_perfiles (presupuesto_id, perfil_id, quantity) VALUE (?, ?, ?)",
      [presupuestoId, perfil_id, quantity]);
    }
  } catch (error){
    console.error("Error al guardar:", error);
    return NextResponse.json({ Problemas: "Error al guardar", error}, {status: 500});
  }

  }
    
    return NextResponse.json(
      { message: "Guardado exitosamente"},
      {status: 201}
    );
}