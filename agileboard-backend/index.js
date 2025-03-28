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

// ===================== PROYECTOS =====================

app.get('/proyectos', (req, res) => {
  res.json(db.data.proyectos)
})

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

// ===================== TAREAS =====================

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

// ✅ NUEVO: Endpoint para actualizar una tarea (drag & drop)
app.put("/tareas/:id", async (req, res) => {
  await db.read()
  const index = db.data.tareas.findIndex(t => t.id === req.params.id)
  if (index === -1) return res.status(404).send("Tarea no encontrada")

  db.data.tareas[index] = req.body
  await db.write()
  res.send(db.data.tareas[index])
})

// ===================== SERVER =====================

const PORT = 4000
app.listen(PORT, () => {
  console.log(`🔥 Servidor backend corriendo en http://localhost:${PORT}`)
})
