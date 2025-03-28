const API_URL = 'http://localhost:4000/proyectos'

export async function crearProyecto(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Error al crear proyecto')
  }

  return await res.json()
}

export async function obtenerProyectos() {
  const res = await fetch(API_URL)
  return await res.json()
}
// src/services/proyectosService.js

export async function obtenerProyectoPorId(id) {
    const res = await fetch("/db.json")
  
    if (!res.ok) {
      throw new Error("Error al obtener proyectos")
    }
  
    const data = await res.json()
    const proyecto = data.proyectos.find((proyecto) => proyecto.id === id)
  
    if (!proyecto) {
      throw new Error("Proyecto no encontrado")
    }
  
    return proyecto
  }
  