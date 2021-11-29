import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {AutenticationService} from '../services';
import parseBearerToken from 'parse-bearer-token';

export class AdminStrategy implements AuthenticationStrategy{
  name: string = 'admin';
  constructor(
    @service(AutenticationService)
    public serviceAutentication: AutenticationService
  ){

  }

  async authenticate(request: Request):Promise<UserProfile|undefined>{
    let token = parseBearerToken(request);
    if (token){
      let data_admin = this.serviceAutentication.ValidarTokenJWT(token);
      if(data_admin){
        let admin_info: UserProfile = Object.assign({
          name: data_admin.data.nombres,
          email: data_admin.data.email
        });
        return admin_info;
      }else{
        throw new HttpErrors[405]("Token inválido");
      }
    }else{
      throw new HttpErrors[405]("No se encontro el token consultado");
    }
  }
}
