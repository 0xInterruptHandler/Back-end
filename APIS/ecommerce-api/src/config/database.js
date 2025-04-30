const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_HOST, // Por ejemplo: 'localhost'
  username: process.env.DB_USER, // Por ejemplo: 'sa'
  password: process.env.DB_PASSWORD, // Por ejemplo: 'your_password'
  database: process.env.DB_NAME, // Nombre de la base de datos
  dialectOptions: {
    // Configuración adicional para conectarse de manera segura
    options: {
      encrypt: true,  // Usado para habilitar conexiones seguras (con SSL)
      trustServerCertificate: true, // Asegura que el certificado del servidor sea confiable
    },
  },
  logging: false, // Deshabilitar el log de SQL si no es necesario
});

module.exports = sequelize;
