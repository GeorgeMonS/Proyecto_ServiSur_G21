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
import {OrdenModel} from '../models';
import {OrdenModelRepository} from '../repositories';

@authenticate("admin")
export class OrdenController {
  constructor(
    @repository(OrdenModelRepository)
    public ordenModelRepository : OrdenModelRepository,
  ) {}


  @post('/ordenes')
  @response(200, {
    description: 'OrdenModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrdenModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenModel, {
            title: 'NewOrdenModel',
            exclude: ['id'],
          }),
        },
      },
    })
    ordenModel: Omit<OrdenModel, 'id'>,
  ): Promise<OrdenModel> {
    return this.ordenModelRepository.create(ordenModel);
  }

  @get('/ordenes/count')
  @response(200, {
    description: 'OrdenModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrdenModel) where?: Where<OrdenModel>,
  ): Promise<Count> {
    return this.ordenModelRepository.count(where);
  }
  
  @authenticate.skip()
  @get('/ordenes')
  @response(200, {
    description: 'Array of OrdenModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrdenModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrdenModel) filter?: Filter<OrdenModel>,
  ): Promise<OrdenModel[]> {
    return this.ordenModelRepository.find(filter);
  }

  @patch('/ordenes')
  @response(200, {
    description: 'OrdenModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenModel, {partial: true}),
        },
      },
    })
    ordenModel: OrdenModel,
    @param.where(OrdenModel) where?: Where<OrdenModel>,
  ): Promise<Count> {
    return this.ordenModelRepository.updateAll(ordenModel, where);
  }

  @get('/ordenes/{id}')
  @response(200, {
    description: 'OrdenModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrdenModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrdenModel, {exclude: 'where'}) filter?: FilterExcludingWhere<OrdenModel>
  ): Promise<OrdenModel> {
    return this.ordenModelRepository.findById(id, filter);
  }

  @patch('/ordenes/{id}')
  @response(204, {
    description: 'OrdenModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenModel, {partial: true}),
        },
      },
    })
    ordenModel: OrdenModel,
  ): Promise<void> {
    await this.ordenModelRepository.updateById(id, ordenModel);
  }

  @put('/ordenes/{id}')
  @response(204, {
    description: 'OrdenModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ordenModel: OrdenModel,
  ): Promise<void> {
    await this.ordenModelRepository.replaceById(id, ordenModel);
  }

  @del('/ordenes/{id}')
  @response(204, {
    description: 'OrdenModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordenModelRepository.deleteById(id);
  }
}
