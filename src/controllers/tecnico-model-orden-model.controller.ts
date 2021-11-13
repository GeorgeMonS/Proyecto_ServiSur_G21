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
  TecnicoModel,
  OrdenModel,
} from '../models';
import {TecnicoModelRepository} from '../repositories';

export class TecnicoModelOrdenModelController {
  constructor(
    @repository(TecnicoModelRepository) protected tecnicoModelRepository: TecnicoModelRepository,
  ) { }

  @get('/tecnico-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'Array of TecnicoModel has many OrdenModel',
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
    return this.tecnicoModelRepository.Ordenes(id).find(filter);
  }

  @post('/tecnico-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'TecnicoModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrdenModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TecnicoModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenModel, {
            title: 'NewOrdenModelInTecnicoModel',
            exclude: ['id'],
            optional: ['IdTecnico']
          }),
        },
      },
    }) ordenModel: Omit<OrdenModel, 'id'>,
  ): Promise<OrdenModel> {
    return this.tecnicoModelRepository.Ordenes(id).create(ordenModel);
  }

  @patch('/tecnico-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'TecnicoModel.OrdenModel PATCH success count',
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
    return this.tecnicoModelRepository.Ordenes(id).patch(ordenModel, where);
  }

  @del('/tecnico-models/{id}/orden-models', {
    responses: {
      '200': {
        description: 'TecnicoModel.OrdenModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrdenModel)) where?: Where<OrdenModel>,
  ): Promise<Count> {
    return this.tecnicoModelRepository.Ordenes(id).delete(where);
  }
}
