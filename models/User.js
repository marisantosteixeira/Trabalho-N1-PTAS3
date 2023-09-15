const connection = require('../config/connection');

const User = connection.define('users',{
    id: {
        type: connection.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: connection.STRING,
        allowNull: false
    },
    password:{
        type: connection.STRING,
        allowNull:false
    },
    email:{
        type: connection.STRING,
        allowNull:false,
        unique:true
    } 
    })
User.sync();
module.exports = User;