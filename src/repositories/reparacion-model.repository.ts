import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ReparacionModel, ReparacionModelRelations, RevisionModel} from '../models';
import {RevisionModelRepository} from './revision-model.repository';

export class ReparacionModelRepository extends DefaultCrudRepository<
  ReparacionModel,
  typeof ReparacionModel.prototype.id,
  ReparacionModelRelations
> {

  public readonly Reparacion_Revision: BelongsToAccessor<RevisionModel, typeof ReparacionModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionModelRepository') protected revisionModelRepositoryGetter: Getter<RevisionModelRepository>,
  ) {
    super(ReparacionModel, dataSource);
    this.Reparacion_Revision = this.createBelongsToAccessorFor('Reparacion_Revision', revisionModelRepositoryGetter,);
    this.registerInclusionResolver('Reparacion_Revision', this.Reparacion_Revision.inclusionResolver);
  }
}
