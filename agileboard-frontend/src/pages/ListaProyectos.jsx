import { useEffect, useState } from "react"
import { obtenerProyectos } from "../services/proyectosService"
import { useNavigate } from "react-router-dom"

function ListaProyectos() {
  const [proyectos, setProyectos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    obtenerProyectos()
      .then(data => setProyectos(data))
      .catch(err => {
        console.error("❌ Error al obtener proyectos:", err)
        alert("Error al cargar los proyectos")
      })
  }, [])

  const eliminarProyecto = (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este proyecto?")
    if (!confirmar) return

    fetch(`http://localhost:4000/proyectos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProyectos(prev => prev.filter(p => p.id !== id))
    })
  }

  const editarProyecto = (proyecto) => {
    const nuevoNombre = prompt("Nuevo nombre del proyecto:", proyecto.nombre)
    if (!nuevoNombre || nuevoNombre === proyecto.nombre) return

    const actualizado = { ...proyecto, nombre: nuevoNombre }

    fetch(`http://localhost:4000/proyectos/${proyecto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizado),
    }).then(() => {
      setProyectos(prev =>
        prev.map(p => (p.id === proyecto.id ? actualizado : p))
      )
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Mis Proyectos</h2>

      {proyectos.length === 0 ? (
        <p className="text-center text-gray-600">No hay proyectos todavía.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {proyectos.map((proyecto) => (
            <div
              key={proyecto.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200 relative group"
            >
              <h3
                className="text-xl font-bold text-gray-800 cursor-pointer"
                onClick={() => navigate(`/proyecto/${proyecto.id}`)}
              >
                {proyecto.nombre}
              </h3>

              <div
                className="h-1 mt-2 rounded"
                style={{ backgroundColor: proyecto.color }}
              ></div>

              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => editarProyecto(proyecto)} title="Editar">
                  ✏️
                </button>
                <button onClick={() => eliminarProyecto(proyecto.id)} title="Eliminar">
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListaProyectos
