import { useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-8">AgileBoard</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
          onClick={() => navigate("/nuevo-proyecto")}
        >
          Nuevo Proyecto
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded"
          onClick={() => navigate("/proyectos")}
        >
          Proyectos
        </button>
      </div>
    </div>
  )
}

export default HomePage
