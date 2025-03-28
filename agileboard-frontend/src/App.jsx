import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NuevoProyecto from "./pages/NuevoProyecto"
import ListaProyectos from "./pages/ListaProyectos"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* dentro de <Routes>... */}
        <Route path="/nuevo-proyecto" element={<NuevoProyecto />} />
        <Route path="/proyectos" element={<ListaProyectos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
