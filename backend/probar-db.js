
const conexion = require('./database');

async function probarConexion() {
  try {
    const [filas] = await conexion.query('SELECT * FROM tickets');

    console.log('Conexión a MySQL correcta');
    console.log('Tickets encontrados:', filas.length);
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
  } finally {
    await conexion.end();
  }
}

probarConexion();
