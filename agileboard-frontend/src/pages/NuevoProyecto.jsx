import { useState } from "react"
import { crearProyecto } from "../services/proyectosService"
import { useNavigate } from "react-router-dom"

function NuevoProyecto() {
  const [nombre, setNombre] = useState("")
  const [color, setColor] = useState("#4f46e5")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate() // ✅ Inicializamos el navegador

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nombre.trim()) {
      alert("El nombre del proyecto es obligatorio.")
      return
    }

    setLoading(true)

    try {
      const nuevoProyecto = await crearProyecto({ nombre, color })
      console.log("🟢 Proyecto guardado:", nuevoProyecto)
      alert("✅ Proyecto creado correctamente")

      // ✅ Redirigimos a /proyectos
      navigate("/proyectos")
    } catch (error) {
      console.error("Error al crear proyecto:", error)
      alert("❌ Hubo un error al guardar el proyecto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-6">Crear Nuevo Proyecto</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre del Proyecto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Ej. Tablero Kanban"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-full border-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Guardando..." : "Crear Proyecto"}
        </button>
      </form>
    </div>
  )
}

export default NuevoProyecto
