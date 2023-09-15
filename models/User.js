const connection = require('../config/connection');

const User = connection.sequelize.define('users',{
    id: {
        type: connection.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: connection.Sequelize.INTEGER,
        allowNull: false
    },
    password:{
        type: connection.Sequelize.INTEGER,
        allowNull:false
    },
    email:{
        type: connection.Sequelize.INTEGER,
        allowNull:false,
        unique:true
    } 
    })
User.sync();
module.exports = User;