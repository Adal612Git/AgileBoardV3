import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function TableroProyecto() {
  const { id } = useParams()
  const [tareas, setTareas] = useState([])
  const [nombreProyecto, setNombreProyecto] = useState("")

  useEffect(() => {
    console.log("🧩 ID recibido en TableroProyecto:", id)

    // Cargar tareas del proyecto
    fetch("http://localhost:4000/tareas")
      .then(res => res.json())
      .then(data => {
        const tareasProyecto = data.filter(t => t.proyectoId === id)
        setTareas(tareasProyecto)
      })

    // Cargar nombre del proyecto con seguridad
    fetch(`http://localhost:4000/proyectos?id=${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(data => {
        console.log("📦 Resultado del fetch (filtrado):", data)
        const proyecto = data.find(p => p.id === id)
        if (proyecto) {
          setNombreProyecto(proyecto.nombre)
        } else {
          setNombreProyecto("Proyecto no encontrado")
        }
      })
      .catch(err => {
        console.error("❌ Error al obtener el proyecto:", err)
        setNombreProyecto("Error al cargar")
      })
  }, [id])

  const estados = ["todo", "in-progress", "done"]

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const nuevaTareas = Array.from(tareas)
    const [movedTask] = nuevaTareas.splice(result.source.index, 1)
    movedTask.estado = result.destination.droppableId
    nuevaTareas.splice(result.destination.index, 0, movedTask)

    setTareas(nuevaTareas)

    fetch(`http://localhost:4000/tareas/${movedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movedTask),
    })
  }

  const agregarTarea = (estado) => {
    const titulo = prompt("Título de la tarea:")
    const descripcion = prompt("Descripción:")

    if (!titulo) return

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
      .then(t => setTareas(prev => [...prev, t]))
  }

  const editarTarea = (tarea) => {
    const nuevoTitulo = prompt("Nuevo título:", tarea.titulo)
    const nuevaDescripcion = prompt("Nueva descripción:", tarea.descripcion)

    if (!nuevoTitulo) return

    const actualizada = {
      ...tarea,
      titulo: nuevoTitulo,
      descripcion: nuevaDescripcion || "",
    }

    fetch(`http://localhost:4000/tareas/${tarea.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizada),
    }).then(() => {
      setTareas(prev =>
        prev.map(t => (t.id === tarea.id ? actualizada : t))
      )
    })
  }

  const eliminarTarea = (id) => {
    const confirmar = confirm("¿Eliminar esta tarea?")
    if (!confirmar) return

    fetch(`http://localhost:4000/tareas/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTareas(prev => prev.filter(t => t.id !== id))
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        {nombreProyecto || "Cargando..."}
      </h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {estados.map((estado) => (
            <Droppable droppableId={estado} key={estado}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white rounded shadow p-4 min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold capitalize mb-4">
                    {estado.replace("-", " ")}
                  </h2>

                  {tareas
                    .filter(t => t.estado === estado)
                    .map((tarea, index) => (
                      <Draggable
                        key={`draggable-${tarea.id}`}
                        draggableId={String(tarea.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-gray-200 rounded p-3 mb-3 shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold">{tarea.titulo}</h3>
                                <p className="text-sm text-gray-700">{tarea.descripcion}</p>
                              </div>
                              <div className="flex gap-2 ml-2">
                                <button onClick={() => editarTarea(tarea)} title="Editar">✏️</button>
                                <button onClick={() => eliminarTarea(tarea.id)} title="Eliminar">❌</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}

                  <button
                    onClick={() => agregarTarea(estado)}
                    className="mt-4 text-blue-500 text-sm hover:underline"
                  >
                    + Agregar tarea
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default TableroProyecto
