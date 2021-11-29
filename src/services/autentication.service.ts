import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { PersonaModelRepository } from '../repositories';
import { PersonaModel } from '../models';
import { Keys } from '../config/keys';

const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticationService {
  constructor(
    @repository(PersonaModelRepository)
    public personaRepository: PersonaModelRepository,
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  identificarPersona(usuario: string, clave: string) {
    try {
      let p = this.personaRepository.findOne({
        where: {email: usuario, clave: clave},
      });
      if (p) {
        return p;
      }
      return false;
    }
    catch {
      return false;
    }
  }

  GenerarTokenJWT(personaModel:PersonaModel){
    let token = jwt.sign({
      data: {
        id: personaModel.id,
        email: personaModel.email,
        nombres: personaModel.nombres + " " + personaModel.apellidos
      }
    },
      Keys.JWTkey);
    return token;
  }

  ValidarTokenJWT(token:string){
    try{
      let datos = jwt.verify(token, Keys.JWTkey);
      return datos;
    } catch{
      return false;
    }
  }

}
