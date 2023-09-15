const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const {name,email,password } = req.body;
    await User.create({
       name:name,
       email:email,
       password:password
    }).then(() => {
        res.json('Usuario criado ');
        console.log('Usuario criado');
    }).catch((erro) => {
        res.json(' Erro ao criar usuario ');
        console.log(` Erro ao criar usuario  : ${erro}`);
    })
}


const findUsers = async (req, res) => {
    const users = await User.findAll();
    try {
        res.json(users);
    } catch (error) {
        res.status(404).json("Ocorreu um erro na busca!");
    };
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.json(" Usuario deletado");
        })
    } catch (error) {
        res.status(404).json("Erro ao deletar");
    }
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name,email,password } = req.body;
    try {
        await User.update(
            {
                name:name,
                email:email,
                password:password 
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json("Usuario atualizado");
        })
    } catch (error) {
        res.status(404).json("Erro ao atualizar!");
    }
}

const authenticatedUser = async (req, res) => {
    const {name,email,password} = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
                name:name,
                email:email,
                password:password
            }
        })
        const token = jwt.sign({
            name:isUserAuthenticated.name,
            email:isUserAuthenticated.email,
            password:isUserAuthenticated.password
        },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            name: isUserAuthenticated.name,
            email: isUserAuthenticated.email,
            password:isUserAuthenticated.password,
            token: token
        });
    } catch (error) {
        return res.json("Erro na autenticação do usuário");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser};
