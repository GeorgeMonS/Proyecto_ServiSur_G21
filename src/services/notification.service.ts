import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Keys} from '../config/keys';
const SgMail = require('@sendgrid/mail')

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  SendEmail(destino: string, asunto: string, contenido: string){
    SgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino,
      //Correo con el que estoy registrado en sendgrid
      from: Keys.email_origin,
      subject: asunto,
      html: contenido,
    }
    SgMail
    .send(msg)
    .then(() => {
      console.log('Email enviado')
    })
    .catch((error:any) => {
      console.error(error)
    })
  }
}
