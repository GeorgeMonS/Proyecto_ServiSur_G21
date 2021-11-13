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
import {RevisionModel} from '../models';
import {RevisionModelRepository} from '../repositories';

export class RevisionController {
  constructor(
    @repository(RevisionModelRepository)
    public revisionModelRepository : RevisionModelRepository,
  ) {}

  @post('/revisiones')
  @response(200, {
    description: 'RevisionModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(RevisionModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionModel, {
            title: 'NewRevisionModel',
            exclude: ['id'],
          }),
        },
      },
    })
    revisionModel: Omit<RevisionModel, 'id'>,
  ): Promise<RevisionModel> {
    return this.revisionModelRepository.create(revisionModel);
  }

  @get('/revisiones/count')
  @response(200, {
    description: 'RevisionModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RevisionModel) where?: Where<RevisionModel>,
  ): Promise<Count> {
    return this.revisionModelRepository.count(where);
  }

  @get('/revisiones')
  @response(200, {
    description: 'Array of RevisionModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RevisionModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RevisionModel) filter?: Filter<RevisionModel>,
  ): Promise<RevisionModel[]> {
    return this.revisionModelRepository.find(filter);
  }

  @patch('/revisiones')
  @response(200, {
    description: 'RevisionModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionModel, {partial: true}),
        },
      },
    })
    revisionModel: RevisionModel,
    @param.where(RevisionModel) where?: Where<RevisionModel>,
  ): Promise<Count> {
    return this.revisionModelRepository.updateAll(revisionModel, where);
  }

  @get('/revisiones/{id}')
  @response(200, {
    description: 'RevisionModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RevisionModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RevisionModel, {exclude: 'where'}) filter?: FilterExcludingWhere<RevisionModel>
  ): Promise<RevisionModel> {
    return this.revisionModelRepository.findById(id, filter);
  }

  @patch('/revisiones/{id}')
  @response(204, {
    description: 'RevisionModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionModel, {partial: true}),
        },
      },
    })
    revisionModel: RevisionModel,
  ): Promise<void> {
    await this.revisionModelRepository.updateById(id, revisionModel);
  }

  @put('/revisiones/{id}')
  @response(204, {
    description: 'RevisionModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() revisionModel: RevisionModel,
  ): Promise<void> {
    await this.revisionModelRepository.replaceById(id, revisionModel);
  }

  @del('/revisiones/{id}')
  @response(204, {
    description: 'RevisionModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.revisionModelRepository.deleteById(id);
  }
}
