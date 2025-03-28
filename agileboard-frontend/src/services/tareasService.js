const API_URL = "http://localhost:4000/tareas"

export async function crearTarea(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Error al crear tarea")
  return await res.json()
}

export async function obtenerTareas() {
  const res = await fetch(API_URL)
  return await res.json()
}
