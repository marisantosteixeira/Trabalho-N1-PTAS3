const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const passwordCrypto = await bcrypt.hash(password, 10 );
    
    await User.create({
        name: name,
        email: email,
        password: passwordCrypto
    }).then(() => {
        res.json('Usuário cadastrado com sucesso');
        console.log('Usuário cadastrado com sucesso');
    }).catch((erro) => {
        res.json(' Erro ao cadastrar');
        console.log(`Erro ao cadastrar: ${erro}`);
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
                id: id
            }
        }).then(() => {
            res.json("Usuário deletado com sucesso!");
        })
    } catch (error) {
        res.status(404).json("Erro ao deletar usuário.");
    }
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email, password } = req.body;
    const passwordCrypto = await bcrypt.hash(password, 10);

    try {
        await User.update(
            {
                name: name,
                email: email,
                password: passwordCrypto
            },
            {
                where: {
                    id: id
                }
            }
            ).then(() => {
                res.json("Usuário atualizado com sucesso!");
            })
        } catch (error) {
            res.status(404).json("Erro ao atualizar usuário!");
        }
    }
    
    const authenticatedUser = async (req, res) => {
        const { email, password } = req.body;
        try {
            const isUserAuthenticated = await User.findOne({
                where: {
                    email: email
                }
            });
            if(!isUserAuthenticated){
                return res.status(401).json ("usuario nao encontrado");
            }
            const isPassswordValidate = await bcrypt.compare(password, isUserAuthenticated.password);
            if(isPassswordValidate === false){
                return res.status(401).json ("senha não correspondida");
            }

            const token = jwt.sign({ email: email }, 
                process.env.SECRET, {
                expiresIn: 86400,
                });
                res.cookie('token', token, { httpOnly: true }).json({
                    name: isUserAuthenticated.name,
                    email: isUserAuthenticated.email,
                    token: token

                });
        } catch (error) {
        return res.json("Erro ao autenticar usuário");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };
