import {authenticate} from '@loopback/authentication';
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
import {ReparacionModel} from '../models';
import {ReparacionModelRepository} from '../repositories';

@authenticate("admin")
export class ReparacionController {
  constructor(
    @repository(ReparacionModelRepository)
    public reparacionModelRepository : ReparacionModelRepository,
  ) {}

  @post('/reparaciones')
  @response(200, {
    description: 'ReparacionModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(ReparacionModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReparacionModel, {
            title: 'NewReparacionModel',
            exclude: ['id'],
          }),
        },
      },
    })
    reparacionModel: Omit<ReparacionModel, 'id'>,
  ): Promise<ReparacionModel> {
    return this.reparacionModelRepository.create(reparacionModel);
  }

  @get('/reparaciones/count')
  @response(200, {
    description: 'ReparacionModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ReparacionModel) where?: Where<ReparacionModel>,
  ): Promise<Count> {
    return this.reparacionModelRepository.count(where);
  }

  @get('/reparaciones')
  @response(200, {
    description: 'Array of ReparacionModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ReparacionModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ReparacionModel) filter?: Filter<ReparacionModel>,
  ): Promise<ReparacionModel[]> {
    return this.reparacionModelRepository.find(filter);
  }

  @patch('/reparaciones')
  @response(200, {
    description: 'ReparacionModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReparacionModel, {partial: true}),
        },
      },
    })
    reparacionModel: ReparacionModel,
    @param.where(ReparacionModel) where?: Where<ReparacionModel>,
  ): Promise<Count> {
    return this.reparacionModelRepository.updateAll(reparacionModel, where);
  }

  @get('/reparaciones/{id}')
  @response(200, {
    description: 'ReparacionModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ReparacionModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ReparacionModel, {exclude: 'where'}) filter?: FilterExcludingWhere<ReparacionModel>
  ): Promise<ReparacionModel> {
    return this.reparacionModelRepository.findById(id, filter);
  }

  @patch('/reparaciones/{id}')
  @response(204, {
    description: 'ReparacionModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReparacionModel, {partial: true}),
        },
      },
    })
    reparacionModel: ReparacionModel,
  ): Promise<void> {
    await this.reparacionModelRepository.updateById(id, reparacionModel);
  }

  @put('/reparaciones/{id}')
  @response(204, {
    description: 'ReparacionModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reparacionModel: ReparacionModel,
  ): Promise<void> {
    await this.reparacionModelRepository.replaceById(id, reparacionModel);
  }

  @del('/reparaciones/{id}')
  @response(204, {
    description: 'ReparacionModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reparacionModelRepository.deleteById(id);
  }
}
