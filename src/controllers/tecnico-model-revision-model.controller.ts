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
  RevisionModel,
} from '../models';
import {TecnicoModelRepository} from '../repositories';

export class TecnicoModelRevisionModelController {
  constructor(
    @repository(TecnicoModelRepository) protected tecnicoModelRepository: TecnicoModelRepository,
  ) { }

  @get('/tecnico-models/{id}/revision-models', {
    responses: {
      '200': {
        description: 'Array of TecnicoModel has many RevisionModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RevisionModel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RevisionModel>,
  ): Promise<RevisionModel[]> {
    return this.tecnicoModelRepository.Revisiones(id).find(filter);
  }

  @post('/tecnico-models/{id}/revision-models', {
    responses: {
      '200': {
        description: 'TecnicoModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(RevisionModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TecnicoModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionModel, {
            title: 'NewRevisionModelInTecnicoModel',
            exclude: ['id'],
            optional: ['IdTecnicoRevisa']
          }),
        },
      },
    }) revisionModel: Omit<RevisionModel, 'id'>,
  ): Promise<RevisionModel> {
    return this.tecnicoModelRepository.Revisiones(id).create(revisionModel);
  }

  @patch('/tecnico-models/{id}/revision-models', {
    responses: {
      '200': {
        description: 'TecnicoModel.RevisionModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionModel, {partial: true}),
        },
      },
    })
    revisionModel: Partial<RevisionModel>,
    @param.query.object('where', getWhereSchemaFor(RevisionModel)) where?: Where<RevisionModel>,
  ): Promise<Count> {
    return this.tecnicoModelRepository.Revisiones(id).patch(revisionModel, where);
  }

  @del('/tecnico-models/{id}/revision-models', {
    responses: {
      '200': {
        description: 'TecnicoModel.RevisionModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RevisionModel)) where?: Where<RevisionModel>,
  ): Promise<Count> {
    return this.tecnicoModelRepository.Revisiones(id).delete(where);
  }
}
