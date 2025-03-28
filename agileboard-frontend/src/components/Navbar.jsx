// src/components/Navbar.jsx
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6 items-center shadow">
      <Link to="/" className="font-bold hover:underline">🏠 Inicio</Link>
      <Link to="/proyectos" className="hover:underline">📁 Proyectos</Link>
    </nav>
  )
}

export default Navbar
