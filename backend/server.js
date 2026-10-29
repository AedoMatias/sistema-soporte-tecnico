
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const conexion = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Soporte Técnico funcionando');
});

// Obtener todos los tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const [tickets] = await conexion.query(
      'SELECT * FROM tickets ORDER BY id DESC'
    );

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al obtener los tickets'
    });
  }
});

// Registrar un ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const { asunto, descripcion, categoria, prioridad } = req.body;

    if (
      !asunto?.trim() ||
      !descripcion?.trim() ||
      !categoria ||
      !['Alta', 'Media', 'Baja'].includes(prioridad)
    ) {
      return res.status(400).json({
        mensaje: 'Completa los campos correctamente'
      });
    }

    const [resultado] = await conexion.execute(
      `INSERT INTO tickets
      (asunto, descripcion, categoria, prioridad, estado)
      VALUES (?, ?, ?, ?, ?)`,
      [
        asunto.trim(),
        descripcion.trim(),
        categoria,
        prioridad,
        'Pendiente'
      ]
    );

    res.status(201).json({
      mensaje: 'Ticket registrado correctamente',
      id: resultado.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al registrar el ticket'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
