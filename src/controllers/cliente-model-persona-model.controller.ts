import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ClienteModel,
  PersonaModel,
} from '../models';
import {ClienteModelRepository} from '../repositories';

export class ClienteModelPersonaModelController {
  constructor(
    @repository(ClienteModelRepository)
    public clienteModelRepository: ClienteModelRepository,
  ) { }

  @get('/cliente-models/{id}/persona-model', {
    responses: {
      '200': {
        description: 'PersonaModel belonging to ClienteModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PersonaModel)},
          },
        },
      },
    },
  })
  async getPersonaModel(
    @param.path.string('id') id: typeof ClienteModel.prototype.id,
  ): Promise<PersonaModel> {
    return this.clienteModelRepository.persona_cliente(id);
  }
}
