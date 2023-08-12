import { Request, Response, NextFunction } from "express";
//import passport
import passport from "passport";
//import jsonwebtoken
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../models/User";

//import strategy
/* The line `import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";` is importing the
`Strategy` and `ExtractJwt` objects from the "passport-jwt" module. These objects are used to define
and configure the JSON Web Token (JWT) authentication strategy for Passport.js. */
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";



dotenv.config();

//Const para uso do retorno da strategy
const notAuthorized = {status: 401, message: "Not Authorized!"};

// Const de Options da Strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PRIVATE_KEY as string
}


//Definição e configuração de uso da Strategy JWT
passport.use(new JWTStrategy(options, async (payload, done) => {
    
    //Const para receber a consulta do BD pelo id extraído do token
    const user = await User.findByPk(payload.id);

    //Expressão ternária para verificar se retornou algum registro do BD
    if(user){
        return done(null, user);
    }else{
        return done(notAuthorized, false);
    }
    
    //return user ? done(null, user) : done(notAuthorized, false);
    
}));

//Função de gerar token

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_PRIVATE_KEY as string);
}

//Criação do Middleware para autenticação das rotas
export const privateRoute = (req: Request, res: Response, next: NextFunction) => {

    //Criação de função de autenticação
    const authFunction = passport.authenticate('jwt', (err: any, user: any) =>{
        req.user = user; // colocar o objeto user dentro da req para ser usado
        if(user){
            next()
        }else{
            next(notAuthorized);
        }
    });
    // execução de função de autenticação
    authFunction(req, res, next);

}



//exporta o objeto passport
export default passport;