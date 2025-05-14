import clientPromise from "@/app/lib/mongodb";

export async function GET(){
  try{
    const client = await clientPromise
    const db = client.db("budgetApp")
    const collection = db.collection("trabajos")
    const data = await collection.find({}).toArray()

    return Response.json(data)
  }catch (e){
    console.error("Error fetching data:", e)
    return new Response(JSON.stringify({error: 'Error interno del server'}), {
      status: 500
    })
  }
}

export async function POST (request){
  const nuevoTrabajo = await request.json()
  const client = await clientPromise
  const db = client.db("budgetApp")
  const resultado = await db.collection('trabajos').insertOne(nuevoTrabajo)
  return Response.json(resultado)
}