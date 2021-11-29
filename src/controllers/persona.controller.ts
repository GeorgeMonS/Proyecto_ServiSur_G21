import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Keys} from '../config/keys';
import {PersonaModel} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {PersonaModelRepository} from '../repositories';
import {AutenticationService, NotificationService} from '../services';
const fetch = require("node-fetch");

export class PersonaController {
  constructor(
    @repository(PersonaModelRepository)
    public personaModelRepository : PersonaModelRepository,
    @service(AutenticationService)
    public servicioAutenticacion: AutenticationService,
    @service(NotificationService)
    public notification_service: NotificationService
  ) {}

  @post("/identificarPersona", {
    responses:{
      '200':{
        description: "Identificación de usuarios"
      }
    }
  })

  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ){
    let p = await this.servicioAutenticacion.identificarPersona(credenciales.usuario, credenciales.clave)
    if(p){
      let token = this.servicioAutenticacion.GenerarTokenJWT(p);
      return {
        datos:{
          nombre: p.nombres + " " + p.apellidos,
          correo: p.email,
          id: p.id
        },
        tk: token
      }

    }else{
      throw new HttpErrors[401]("Datos inválidos");
    }
  }

  @post('/person')
  @response(200, {
    description: 'PersonaModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(PersonaModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaModel, {
            title: 'NewPersonaModel',
            exclude: ['id'],
          }),
        },
      },
    })
    personaModel: Omit<PersonaModel, 'id'>,
  ): Promise<PersonaModel> {

    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    personaModel.clave = claveCifrada;
    let p = await this.personaModelRepository.create(personaModel);

    //Notificar al usuario
    let destino = personaModel.email;
    let asunto = 'Registro en ServiSur';
    let contenido = `Bienvenido ${personaModel.nombres} ${personaModel.apellidos} <br>
    a ServiSur la empresa de reparación de electrodomesticos mas grande de Colombia. <br>
    Sus datos de acceso al sistema son:<br>
    <ul>
      <li> Usuario:${personaModel.email}</li>
      <li> Contraseña:${personaModel.clave}</li>
    </ul>
    Gracias por registrarse en nuestra empresa.`;
    fetch(`${Keys.urlNotifications}/correos?destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any)=>{
        console.log(data);
      })
    return p;
  }

  @get('/person/count')
  @response(200, {
    description: 'PersonaModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PersonaModel) where?: Where<PersonaModel>,
  ): Promise<Count> {
    return this.personaModelRepository.count(where);
  }

  @get('/person')
  @response(200, {
    description: 'Array of PersonaModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PersonaModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PersonaModel) filter?: Filter<PersonaModel>,
  ): Promise<PersonaModel[]> {
    return this.personaModelRepository.find(filter);
  }

  @patch('/person')
  @response(200, {
    description: 'PersonaModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaModel, {partial: true}),
        },
      },
    })
    personaModel: PersonaModel,
    @param.where(PersonaModel) where?: Where<PersonaModel>,
  ): Promise<Count> {
    return this.personaModelRepository.updateAll(personaModel, where);
  }

  @get('/person/{id}')
  @response(200, {
    description: 'PersonaModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PersonaModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PersonaModel, {exclude: 'where'}) filter?: FilterExcludingWhere<PersonaModel>
  ): Promise<PersonaModel> {
    return this.personaModelRepository.findById(id, filter);
  }

  @patch('/person/{id}')
  @response(204, {
    description: 'PersonaModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonaModel, {partial: true}),
        },
      },
    })
    personaModel: PersonaModel,
  ): Promise<void> {
    await this.personaModelRepository.updateById(id, personaModel);
  }

  @put('/person/{id}')
  @response(204, {
    description: 'PersonaModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() personaModel: PersonaModel,
  ): Promise<void> {
    await this.personaModelRepository.replaceById(id, personaModel);
  }

  @del('/person/{id}')
  @response(204, {
    description: 'PersonaModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaModelRepository.deleteById(id);
  }
}
