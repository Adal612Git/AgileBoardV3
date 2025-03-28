import express from 'express'
import cors from 'cors'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { nanoid } from 'nanoid'

const app = express()
app.use(cors())
app.use(express.json())

// Configurar lowdb con archivo JSON
const adapter = new JSONFile('db.json')
const db = new Low(adapter, { proyectos: [], tareas: [] })
await db.read()

// Inicializar estructura si no existe
db.data ||= { proyectos: [], tareas: [] }

// Ruta para obtener todos los proyectos
app.get('/proyectos', (req, res) => {
  res.json(db.data.proyectos)
})

// Ruta para crear un nuevo proyecto
app.post('/proyectos', async (req, res) => {
  const { nombre, color } = req.body

  if (!nombre || !color) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' })
  }

  const nuevoProyecto = {
    id: nanoid(),
    nombre,
    color
  }

  db.data.proyectos.push(nuevoProyecto)
  await db.write()

  res.status(201).json(nuevoProyecto)
})

// ENDPOINTS DE TAREAS
app.get("/tareas", async (req, res) => {
  await db.read()
  res.json(db.data.tareas)
})

app.post("/tareas", async (req, res) => {
  const nuevaTarea = req.body
  await db.read()

  if (!db.data.tareas) db.data.tareas = []

  db.data.tareas.push(nuevaTarea)
  await db.write()
  res.status(201).json(nuevaTarea)
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`🔥 Servidor backend corriendo en http://localhost:${PORT}`)
})
