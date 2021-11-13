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
  ReparacionModel,
} from '../models';
import {TecnicoModelRepository} from '../repositories';

export class TecnicoModelReparacionModelController {
  constructor(
    @repository(TecnicoModelRepository) protected tecnicoModelRepository: TecnicoModelRepository,
  ) { }

  @get('/tecnico-models/{id}/reparacion-models', {
    responses: {
      '200': {
        description: 'Array of TecnicoModel has many ReparacionModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ReparacionModel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ReparacionModel>,
  ): Promise<ReparacionModel[]> {
    return this.tecnicoModelRepository.Reparaciones(id).find(filter);
  }

  @post('/tecnico-models/{id}/reparacion-models', {
    responses: {
      '200': {
        description: 'TecnicoModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(ReparacionModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TecnicoModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReparacionModel, {
            title: 'NewReparacionModelInTecnicoModel',
            exclude: ['id'],
            optional: ['IdTecnicoRevisa']
          }),
        },
      },
    }) reparacionModel: Omit<ReparacionModel, 'id'>,
  ): Promise<ReparacionModel> {
    return this.tecnicoModelRepository.Reparaciones(id).create(reparacionModel);
  }

  @patch('/tecnico-models/{id}/reparacion-models', {
    responses: {
      '200': {
        description: 'TecnicoModel.ReparacionModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReparacionModel, {partial: true}),
        },
      },
    })
    reparacionModel: Partial<ReparacionModel>,
    @param.query.object('where', getWhereSchemaFor(ReparacionModel)) where?: Where<ReparacionModel>,
  ): Promise<Count> {
    return this.tecnicoModelRepository.Reparaciones(id).patch(reparacionModel, where);
  }

  @del('/tecnico-models/{id}/reparacion-models', {
    responses: {
      '200': {
        description: 'TecnicoModel.ReparacionModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ReparacionModel)) where?: Where<ReparacionModel>,
  ): Promise<Count> {
    return this.tecnicoModelRepository.Reparaciones(id).delete(where);
  }
}
