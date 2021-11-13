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
  OrdenModel,
} from '../models';
import {RevisionModelRepository} from '../repositories';

export class RevisionModelOrdenModelController {
  constructor(
    @repository(RevisionModelRepository)
    public revisionModelRepository: RevisionModelRepository,
  ) { }

  @get('/revision-models/{id}/orden-model', {
    responses: {
      '200': {
        description: 'OrdenModel belonging to RevisionModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrdenModel)},
          },
        },
      },
    },
  })
  async getOrdenModel(
    @param.path.string('id') id: typeof RevisionModel.prototype.id,
  ): Promise<OrdenModel> {
    return this.revisionModelRepository.Revision_Orden(id);
  }
}
