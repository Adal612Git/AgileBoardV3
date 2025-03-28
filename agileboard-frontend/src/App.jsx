import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NuevoProyecto from "./pages/NuevoProyecto"
import ListaProyectos from "./pages/ListaProyectos"
import TableroProyecto from "./pages/TableroProyecto"
import Navbar from "./components/Navbar" // ✅ Importamos el navbar

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ Este navbar se muestra en todas las páginas */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nuevo-proyecto" element={<NuevoProyecto />} />
        <Route path="/proyectos" element={<ListaProyectos />} />
        <Route path="/proyecto/:id" element={<TableroProyecto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
