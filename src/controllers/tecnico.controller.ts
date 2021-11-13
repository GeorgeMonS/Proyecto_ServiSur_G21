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
import {TecnicoModel} from '../models';
import {TecnicoModelRepository} from '../repositories';

export class TecnicoController {
  constructor(
    @repository(TecnicoModelRepository)
    public tecnicoModelRepository : TecnicoModelRepository,
  ) {}

  @post('/tecnicos')
  @response(200, {
    description: 'TecnicoModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(TecnicoModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TecnicoModel, {
            title: 'NewTecnicoModel',
            exclude: ['id'],
          }),
        },
      },
    })
    tecnicoModel: Omit<TecnicoModel, 'id'>,
  ): Promise<TecnicoModel> {
    return this.tecnicoModelRepository.create(tecnicoModel);
  }

  @get('/tecnicos/count')
  @response(200, {
    description: 'TecnicoModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TecnicoModel) where?: Where<TecnicoModel>,
  ): Promise<Count> {
    return this.tecnicoModelRepository.count(where);
  }

  @get('/tecnicos')
  @response(200, {
    description: 'Array of TecnicoModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TecnicoModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TecnicoModel) filter?: Filter<TecnicoModel>,
  ): Promise<TecnicoModel[]> {
    return this.tecnicoModelRepository.find(filter);
  }

  @patch('/tecnicos')
  @response(200, {
    description: 'TecnicoModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TecnicoModel, {partial: true}),
        },
      },
    })
    tecnicoModel: TecnicoModel,
    @param.where(TecnicoModel) where?: Where<TecnicoModel>,
  ): Promise<Count> {
    return this.tecnicoModelRepository.updateAll(tecnicoModel, where);
  }

  @get('/tecnicos/{id}')
  @response(200, {
    description: 'TecnicoModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TecnicoModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TecnicoModel, {exclude: 'where'}) filter?: FilterExcludingWhere<TecnicoModel>
  ): Promise<TecnicoModel> {
    return this.tecnicoModelRepository.findById(id, filter);
  }

  @patch('/tecnicos/{id}')
  @response(204, {
    description: 'TecnicoModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TecnicoModel, {partial: true}),
        },
      },
    })
    tecnicoModel: TecnicoModel,
  ): Promise<void> {
    await this.tecnicoModelRepository.updateById(id, tecnicoModel);
  }

  @put('/tecnicos/{id}')
  @response(204, {
    description: 'TecnicoModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tecnicoModel: TecnicoModel,
  ): Promise<void> {
    await this.tecnicoModelRepository.replaceById(id, tecnicoModel);
  }

  @del('/tecnicos/{id}')
  @response(204, {
    description: 'TecnicoModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tecnicoModelRepository.deleteById(id);
  }
}
