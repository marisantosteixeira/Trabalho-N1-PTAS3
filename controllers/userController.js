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
        res.json('Usuário cadastrado com sucesso ');
        console.log('Usuário cadastrado com sucesso ');
    }).catch((erro) => {
        res.json(' Erro ao cadastrar usuario ');
        console.log(` Erro ao cadastrar usuario  : ${erro}`);
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
            res.json(" Usuario deletado com sucesso");
        })
    } catch (error) {
        res.status(404).json("Erro ao deletar usuário");
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
            res.json("Usuário atualizado com sucesso");
        })
    } catch (error) {
        res.status(404).json("Erro ao atualizar usuário!");
    }
}

const authenticatedUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
              
                email:email,
                password:password
            }
        })
        const token = jwt.sign({
            email:isUserAuthenticated.email,
            password:isUserAuthenticated.password
        },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            email: isUserAuthenticated.email,
            password:isUserAuthenticated.password,
            token: token
        });
    } catch (error) {
        return res.json("Erro na autenticação do usuário");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser};
