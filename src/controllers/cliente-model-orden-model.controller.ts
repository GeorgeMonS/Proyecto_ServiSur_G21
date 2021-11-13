import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ClienteModel,
  OrdenModel,
} from '../models';
import {ClienteModelRepository} from '../repositories';

export class ClienteModelOrdenModelController {
  constructor(
    @repository(ClienteModelRepository) protected clienteModelRepository: ClienteModelRepository,
  ) { }

  @get('/cliente-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'Array of ClienteModel has many OrdenModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrdenModel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrdenModel>,
  ): Promise<OrdenModel[]> {
    return this.clienteModelRepository.ordenes(id).find(filter);
  }

  @post('/cliente-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'ClienteModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrdenModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ClienteModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenModel, {
            title: 'NewOrdenModelInClienteModel',
            exclude: ['id'],
            optional: ['IdCliente']
          }),
        },
      },
    }) ordenModel: Omit<OrdenModel, 'id'>,
  ): Promise<OrdenModel> {
    return this.clienteModelRepository.ordenes(id).create(ordenModel);
  }

  @patch('/cliente-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'ClienteModel.OrdenModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenModel, {partial: true}),
        },
      },
    })
    ordenModel: Partial<OrdenModel>,
    @param.query.object('where', getWhereSchemaFor(OrdenModel)) where?: Where<OrdenModel>,
  ): Promise<Count> {
    return this.clienteModelRepository.ordenes(id).patch(ordenModel, where);
  }

  @del('/cliente-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'ClienteModel.OrdenModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrdenModel)) where?: Where<OrdenModel>,
  ): Promise<Count> {
    return this.clienteModelRepository.ordenes(id).delete(where);
  }
}
