import { Request, Response } from 'express';
import { User } from '../models/User';
//import generateToken Function
import { generateToken } from '../config/passport';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({where: { email }});
        if(!hasUser) {
            let newUser = await User.create({ email, password });
            const token = generateToken({id: newUser.id});
            res.status(201);
            res.json({ id: newUser.id, token });
        } else {
            res.json({ error: 'E-mail já existe.' });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password){
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({
            where: {
                email,
                password
            }
        });
        if(user){
            const token = generateToken({id: user.id});
            console.log("Login", req.user);
            res.json({ "status": true, token });
        }else{
            res.json({ error: 'E-mail ou senha inválidos!' });
        }
    }
    res.json({ error: 'E-mail e senha obrigatórios!' });
    
    
}

export const list = async (req: Request, res: Response) => {
    console.log("User: ", req.user);

    let users = await User.findAll();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].email );
    }

    res.json({ list });
}