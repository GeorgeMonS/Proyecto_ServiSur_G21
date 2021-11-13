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
} from '@loopback/rest';
import {PersonaModel} from '../models';
import {PersonaModelRepository} from '../repositories';

export class PersonaController {
  constructor(
    @repository(PersonaModelRepository)
    public personaModelRepository : PersonaModelRepository,
  ) {}

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
    return this.personaModelRepository.create(personaModel);
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
