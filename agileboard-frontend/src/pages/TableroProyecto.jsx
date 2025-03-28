import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { obtenerTareas } from "../services/proyectosService"

function TableroProyecto() {
  const { id } = useParams()
  const [tareasTodo, setTareasTodo] = useState([])
  const [tareasInProgress, setTareasInProgress] = useState([])
  const [tareasDone, setTareasDone] = useState([])

  useEffect(() => {
    obtenerTareas().then(data => {
      const delProyecto = data.filter(t => t.proyectoId === id)
      setTareasTodo(delProyecto.filter(t => t.estado === "todo"))
      setTareasInProgress(delProyecto.filter(t => t.estado === "inprogress"))
      setTareasDone(delProyecto.filter(t => t.estado === "done"))
    })
  }, [id])

  const handleCrearTarea = (estado) => {
    const titulo = prompt("Título de la tarea:")
    if (!titulo) return

    const descripcion = prompt("Descripción de la tarea:")

    const nuevaTarea = {
      id: crypto.randomUUID(),
      proyectoId: id,
      titulo,
      descripcion,
      estado,
    }

    fetch("http://localhost:4000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea),
    })
      .then(res => res.json())
      .then(() => {
        if (estado === "todo") {
          setTareasTodo(prev => [...prev, nuevaTarea])
        } else if (estado === "inprogress") {
          setTareasInProgress(prev => [...prev, nuevaTarea])
        } else if (estado === "done") {
          setTareasDone(prev => [...prev, nuevaTarea])
        }
      })
      .catch(err => {
        console.error("Error al crear tarea:", err)
        alert("No se pudo crear la tarea.")
      })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Tablero del Proyecto</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Columna To Do */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">To Do</h2>
          <div className="space-y-2">
            {tareasTodo.map(tarea => (
              <div key={tarea.id} className="p-3 bg-gray-100 rounded shadow">
                <h3 className="font-semibold">{tarea.titulo}</h3>
                <p className="text-sm text-gray-700">{tarea.descripcion}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleCrearTarea("todo")}
            className="mt-4 text-blue-500 hover:underline"
          >
            + Añadir tarea
          </button>
        </div>

        {/* Columna In Progress */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">In Progress</h2>
          <div className="space-y-2">
            {tareasInProgress.map(tarea => (
              <div key={tarea.id} className="p-3 bg-yellow-100 rounded shadow">
                <h3 className="font-semibold">{tarea.titulo}</h3>
                <p className="text-sm text-gray-700">{tarea.descripcion}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleCrearTarea("inprogress")}
            className="mt-4 text-blue-500 hover:underline"
          >
            + Añadir tarea
          </button>
        </div>

        {/* Columna Done */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Done</h2>
          <div className="space-y-2">
            {tareasDone.map(tarea => (
              <div key={tarea.id} className="p-3 bg-green-100 rounded shadow">
                <h3 className="font-semibold">{tarea.titulo}</h3>
                <p className="text-sm text-gray-700">{tarea.descripcion}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleCrearTarea("done")}
            className="mt-4 text-blue-500 hover:underline"
          >
            + Añadir tarea
          </button>
        </div>
      </div>
    </div>
  )
}

export default TableroProyecto
