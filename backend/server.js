
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const conexion = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta principal
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
    console.error('Error al obtener los tickets:', error);

    res.status(500).json({
      mensaje: 'Error al obtener los tickets'
    });
  }
});

// Registrar un ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const {
      asunto,
      solicitante,
      descripcion,
      categoria,
      prioridad
    } = req.body;

    if (
      !asunto?.trim() ||
      !solicitante?.trim() ||
      !descripcion?.trim() ||
      !categoria ||
      !['Alta', 'Media', 'Baja'].includes(prioridad)
    ) {
      return res.status(400).json({
        mensaje: 'Completa todos los campos correctamente'
      });
    }

    const [resultado] = await conexion.execute(
      `INSERT INTO tickets
      (asunto, solicitante, descripcion, categoria, prioridad, estado)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        asunto.trim(),
        solicitante.trim(),
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
    console.error('Error al registrar el ticket:', error);

    res.status(500).json({
      mensaje: 'Error al registrar el ticket'
    });
  }
});

// Editar un ticket
app.put('/api/tickets/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      asunto,
      solicitante,
      descripcion,
      categoria,
      prioridad,
      estado
    } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: 'El ID del ticket no es válido'
      });
    }

    if (
      !asunto?.trim() ||
      !solicitante?.trim() ||
      !descripcion?.trim() ||
      !categoria ||
      !['Alta', 'Media', 'Baja'].includes(prioridad) ||
      !['Pendiente', 'En proceso', 'Finalizado'].includes(estado)
    ) {
      return res.status(400).json({
        mensaje: 'Revisa los campos del ticket'
      });
    }

    const [resultado] = await conexion.execute(
      `UPDATE tickets
       SET asunto = ?, solicitante = ?, descripcion = ?,
           categoria = ?, prioridad = ?, estado = ?
       WHERE id = ?`,
      [
        asunto.trim(),
        solicitante.trim(),
        descripcion.trim(),
        categoria,
        prioridad,
        estado,
        id
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'No se encontró el ticket'
      });
    }

    res.json({
      mensaje: 'Ticket actualizado correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar el ticket:', error);

    res.status(500).json({
      mensaje: 'Error al actualizar el ticket'
    });
  }
});

// Eliminar un ticket
app.delete('/api/tickets/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: 'El ID del ticket no es válido'
      });
    }

    const [resultado] = await conexion.execute(
      'DELETE FROM tickets WHERE id = ?',
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'No se encontró el ticket'
      });
    }

    res.json({
      mensaje: 'Ticket eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar el ticket:', error);

    res.status(500).json({
      mensaje: 'Error al eliminar el ticket'
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
