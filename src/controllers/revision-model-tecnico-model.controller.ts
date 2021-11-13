import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RevisionModel,
  TecnicoModel,
} from '../models';
import {RevisionModelRepository} from '../repositories';

export class RevisionModelTecnicoModelController {
  constructor(
    @repository(RevisionModelRepository)
    public revisionModelRepository: RevisionModelRepository,
  ) { }

  @get('/revision-models/{id}/tecnico-model', {
    responses: {
      '200': {
        description: 'TecnicoModel belonging to RevisionModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TecnicoModel)},
          },
        },
      },
    },
  })
  async getTecnicoModel(
    @param.path.string('id') id: typeof RevisionModel.prototype.id,
  ): Promise<TecnicoModel> {
    return this.revisionModelRepository.Revision_Tecnico(id);
  }
}
