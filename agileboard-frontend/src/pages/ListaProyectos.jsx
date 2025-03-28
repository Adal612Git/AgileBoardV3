import { useEffect, useState } from "react"
import { obtenerProyectos } from "../services/proyectosService"
import { useNavigate } from "react-router-dom"

function ListaProyectos() {
  const [proyectos, setProyectos] = useState([])
  const navigate = useNavigate() // Aquí usamos useNavigate para la navegación

  useEffect(() => {
    obtenerProyectos()
      .then(data => setProyectos(data))
      .catch(err => {
        console.error("❌ Error al obtener proyectos:", err)
        alert("Error al cargar los proyectos")
      })
  }, [])

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
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer" // Aquí agregamos cursor-pointer
              onClick={() => navigate(`/proyecto/${proyecto.id}`)} // Acción de clic para redirigir
            >
              <h3 className="text-xl font-bold text-gray-800">{proyecto.nombre}</h3>
              <div
                className="h-1 mt-2 rounded"
                style={{ backgroundColor: proyecto.color }}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListaProyectos
