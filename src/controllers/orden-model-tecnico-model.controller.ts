import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrdenModel,
  TecnicoModel,
} from '../models';
import {OrdenModelRepository} from '../repositories';

export class OrdenModelTecnicoModelController {
  constructor(
    @repository(OrdenModelRepository)
    public ordenModelRepository: OrdenModelRepository,
  ) { }

  @get('/orden-models/{id}/tecnico-model', {
    responses: {
      '200': {
        description: 'TecnicoModel belonging to OrdenModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TecnicoModel)},
          },
        },
      },
    },
  })
  async getTecnicoModel(
    @param.path.string('id') id: typeof OrdenModel.prototype.id,
  ): Promise<TecnicoModel> {
    return this.ordenModelRepository.Orden_Tecnico(id);
  }
}
