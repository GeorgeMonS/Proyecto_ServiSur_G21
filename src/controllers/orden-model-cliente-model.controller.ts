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
  ClienteModel,
} from '../models';
import {OrdenModelRepository} from '../repositories';

export class OrdenModelClienteModelController {
  constructor(
    @repository(OrdenModelRepository)
    public ordenModelRepository: OrdenModelRepository,
  ) { }

  @get('/orden-models/{id}/cliente-model', {
    responses: {
      '200': {
        description: 'ClienteModel belonging to OrdenModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClienteModel)},
          },
        },
      },
    },
  })
  async getClienteModel(
    @param.path.string('id') id: typeof OrdenModel.prototype.id,
  ): Promise<ClienteModel> {
    return this.ordenModelRepository.Orden_Cliente(id);
  }
}
