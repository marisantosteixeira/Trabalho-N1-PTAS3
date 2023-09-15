const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const {nome, email, senha } = req.body;
    await User.create({
       nome:nome,
       email:email,
       senha:senha

    }).then(() => {
        res.json('Usuario criado com sucesso');
        console.log('Usuario criado com sucesso');
    }).catch((erro) => {
        res.json(' Deu erro na criação do usuario');
        console.log(`Deu erro na criação do usuario : ${erro}`);
    })
}

const findUsers = async (req, res) => {
    const  users    = await User.findAll();
    try {
        res.json(  users  );
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
            res.json("  Usuario deletado com sucesso");
        })
    } catch (error) {
        res.status(404).json("Erro ao deletar usuario");
    }
}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {       } = req.body;
    try {
        await User.update(
            {
               
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json("            ");
        })
    } catch (error) {
        res.status(404).json("                !");
    }
}
const authenticatedUser = async (req, res) => {
    const {       } = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
                
            }
        })
        const token = jwt.sign({
            name: 
            email: 
        },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            name: 
            email: isUserAuthenticated.email,
            token: token
        });
    } catch (error) {
        return res.json("");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };