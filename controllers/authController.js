const { response } = require('express');
const Usuario = require('../models/Usuarios');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', senha: ''};

    //Duplicate errors code
    if(err.code === 11000) {
        errors.email = 'Email ja registrado';
        return errors;
    }

    //validation errors
    if (err.message.includes('Usuario validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

module.exports.signup_get = (request, res) => {
    res.render('signup')
}

module.exports.login_get = (request, res) => {
    res.render('login')
}

module.exports.signup_post = async (request, res) => {
    const { email, senha } = request.body;
    console.log(`Email: ${email} \nSenha: ${senha}`);    

    try {
        const response = await Usuario.create({ email, senha });
        res.status(201).json(response);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (request, res) => {
    const { email, senha } = request.body;
    console.log(`Email: ${email} \nSenha: ${senha}`);    
}