import {Request, Response, NextFunction} from 'express';
import passport, { use } from "passport";
import { BasicStrategy } from "passport-http";

import { User } from '../models/User';

//Const para uso do retorno da strategy
const notAuthorized = {status: 401, message: "Not Authorized!"};

// Definição e configuração da strategy que será utilizada
passport.use(new BasicStrategy( async (email, password, done) => {

    if(email && password){
        const user = await User.findOne({
            where:{
                email, password
            }
        });
        if(user){
            return done(null, user);
        }
    }
    return done(notAuthorized, false);

}));

//Criação do Middleware para autenticação das rotas
export const privateRoute = (req: Request, res: Response, next: NextFunction) =>{
    //Cria a const authFunction
    const authFunction = passport.authenticate('basic', (err: any, user: any) => {
        req.user = user;
        return user ? next() : next(notAuthorized);
    });
    //Executa authFunction
    authFunction(req, res, next);
}

//exporta o objeto passport
export default passport;