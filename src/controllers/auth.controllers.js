import { v4 as uuid } from 'uuid';
import { validateEmail, validateUserRegister, registerUser } from '../repositories/auth.repositories.js';
import { registerUserSession } from '../repositories/users.repositories.js';
import { getUserbyEmail } from '../repositories/users.repositories.js';

async function signUp (req, res) {

    const { name, email, password, confirmPassword, phone, city } = req.body;

    try {
        if (password !== confirmPassword) return res.status(422).send("Senhas não conferem! Por favor, digite novamente");

        const userRegistered = await validateEmail(email);

        if (userRegistered) return res.status(409).send("Já existe um usuário cadastrado com este e-mail!");

        const newUser = await registerUser (name, email, password, phone, city);

        if(newUser == null || newUser.message){
            return res.status(400).send(newUser.message);
        }
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send('Internal server error');
    };
};

async function signIn (req, res) {
    const { email, password } = req.body;
    try {
        const existentUser = await validateUserRegister(email, password);

        if (!existentUser) return res.status(401).send("Usuário inexistente!");
        
        const token = uuid();        
        const user = await getUserbyEmail(email);

        await registerUserSession(user.id, token);

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send('Internal server error');
    };
};

export { signUp, signIn };