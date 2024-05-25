import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "../controllers/autentication.controller.js";

dotenv.config();

function soloAdmin(req, res, next){ 
    const loggeado = revisarCookie(req);
    if(loggeado){
        return next();
    }
    return res.redirect("/");
}

function soloPublico(req, res, next){ 
    const loggeado = revisarCookie(req);
    if(!loggeado){
        return next();
    }
    return res.redirect("/admin");
    
}

function revisarCookie(req) {
    try{
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada =  jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
    console.log(decodificada);
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === decodificada.user);
    console.log(usuarioAResvisar);
    if(!usuarioAResvisar){
      return false
    }
    return true
}catch{
    return false
}

    
}

export const methods = {
    soloAdmin,  
    soloPublico
}