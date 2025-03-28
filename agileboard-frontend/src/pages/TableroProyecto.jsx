import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function TableroProyecto() {
  const { id } = useParams()
  const [tareas, setTareas] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/tareas")
      .then(res => res.json())
      .then(data => {
        const tareasProyecto = data.filter(t => t.proyectoId === id)
        setTareas(tareasProyecto)
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Tablero del Proyecto</h1>

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

                  {tareas.length > 0 &&
                    tareas
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
                              <h3 className="font-bold">{tarea.titulo}</h3>
                              <p className="text-sm text-gray-700">{tarea.descripcion}</p>
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
