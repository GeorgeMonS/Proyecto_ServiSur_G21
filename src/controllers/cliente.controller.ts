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
import {ClienteModel} from '../models';
import {ClienteModelRepository} from '../repositories';

export class ClienteController {
  constructor(
    @repository(ClienteModelRepository)
    public clienteModelRepository : ClienteModelRepository,
  ) {}

  @post('/clientes')
  @response(200, {
    description: 'ClienteModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClienteModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteModel, {
            title: 'NewClienteModel',
            exclude: ['id'],
          }),
        },
      },
    })
    clienteModel: Omit<ClienteModel, 'id'>,
  ): Promise<ClienteModel> {
    return this.clienteModelRepository.create(clienteModel);
  }

  @get('/clientes/count')
  @response(200, {
    description: 'ClienteModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClienteModel) where?: Where<ClienteModel>,
  ): Promise<Count> {
    return this.clienteModelRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of ClienteModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ClienteModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ClienteModel) filter?: Filter<ClienteModel>,
  ): Promise<ClienteModel[]> {
    return this.clienteModelRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'ClienteModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteModel, {partial: true}),
        },
      },
    })
    clienteModel: ClienteModel,
    @param.where(ClienteModel) where?: Where<ClienteModel>,
  ): Promise<Count> {
    return this.clienteModelRepository.updateAll(clienteModel, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'ClienteModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClienteModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ClienteModel, {exclude: 'where'}) filter?: FilterExcludingWhere<ClienteModel>
  ): Promise<ClienteModel> {
    return this.clienteModelRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'ClienteModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteModel, {partial: true}),
        },
      },
    })
    clienteModel: ClienteModel,
  ): Promise<void> {
    await this.clienteModelRepository.updateById(id, clienteModel);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'ClienteModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clienteModel: ClienteModel,
  ): Promise<void> {
    await this.clienteModelRepository.replaceById(id, clienteModel);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'ClienteModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteModelRepository.deleteById(id);
  }
}
