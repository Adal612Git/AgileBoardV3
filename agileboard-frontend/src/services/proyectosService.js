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

export async function obtenerTareas(proyectoId) {
    const res = await fetch("http://localhost:4000/tareas")
    const data = await res.json()
  
    // Filtramos solo las tareas del proyecto actual
    return data.filter(t => t.proyectoId === proyectoId)
  }
  