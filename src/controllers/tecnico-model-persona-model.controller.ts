import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TecnicoModel,
  PersonaModel,
} from '../models';
import {TecnicoModelRepository} from '../repositories';

export class TecnicoModelPersonaModelController {
  constructor(
    @repository(TecnicoModelRepository)
    public tecnicoModelRepository: TecnicoModelRepository,
  ) { }

  @get('/tecnico-models/{id}/persona-model', {
    responses: {
      '200': {
        description: 'PersonaModel belonging to TecnicoModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PersonaModel)},
          },
        },
      },
    },
  })
  async getPersonaModel(
    @param.path.string('id') id: typeof TecnicoModel.prototype.id,
  ): Promise<PersonaModel> {
    return this.tecnicoModelRepository.persona_tecnico(id);
  }
}
