const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize( config.development   );

try {
  sequelize.authenticate();
  console.log('User autenticado com sucesso!');
} catch (error) {
  console.error('User não autenticado', error);
}

module.exports = { Sequelize, sequelize };