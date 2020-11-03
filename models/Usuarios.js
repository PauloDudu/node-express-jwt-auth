const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Preencha esse campo por favor'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'por favor insira um email válido']
    },
    senha: {
        type: String,
        required: [true, 'Preencha esse campo por favor'],
        minlength: [6, 'A senha deve ter no minimo 6 caracteres'],
    }
});


usuarioSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

const Usuario = mongoose.model("Usuario", usuarioSchema);


// //fire a function after doc saved to db 
// usuarioSchema.post('save', function(doc, next) {
//     console.log('Novo usuario foi criado com sucesso', doc)

//     next();
// })

// //fire a function before doc saved to db 
// usuarioSchema.pre('save', function(next) {
//     console.log('Novo usuario ira ser criado en instantes', this)
//     next();
// })

module.exports = Usuario;