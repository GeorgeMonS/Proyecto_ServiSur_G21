import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ReparacionModel,
  RevisionModel,
} from '../models';
import {ReparacionModelRepository} from '../repositories';

export class ReparacionModelRevisionModelController {
  constructor(
    @repository(ReparacionModelRepository)
    public reparacionModelRepository: ReparacionModelRepository,
  ) { }

  @get('/reparacion-models/{id}/revision-model', {
    responses: {
      '200': {
        description: 'RevisionModel belonging to ReparacionModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RevisionModel)},
          },
        },
      },
    },
  })
  async getRevisionModel(
    @param.path.string('id') id: typeof ReparacionModel.prototype.id,
  ): Promise<RevisionModel> {
    return this.reparacionModelRepository.Reparacion_Revision(id);
  }
}
