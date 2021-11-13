import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RevisionModel, RevisionModelRelations, TecnicoModel, OrdenModel} from '../models';
import {TecnicoModelRepository} from './tecnico-model.repository';
import {OrdenModelRepository} from './orden-model.repository';

export class RevisionModelRepository extends DefaultCrudRepository<
  RevisionModel,
  typeof RevisionModel.prototype.id,
  RevisionModelRelations
> {

  public readonly Revision_Tecnico: BelongsToAccessor<TecnicoModel, typeof RevisionModel.prototype.id>;

  public readonly Revision_Orden: BelongsToAccessor<OrdenModel, typeof RevisionModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TecnicoModelRepository') protected tecnicoModelRepositoryGetter: Getter<TecnicoModelRepository>, @repository.getter('OrdenModelRepository') protected ordenModelRepositoryGetter: Getter<OrdenModelRepository>,
  ) {
    super(RevisionModel, dataSource);
    this.Revision_Orden = this.createBelongsToAccessorFor('Revision_Orden', ordenModelRepositoryGetter,);
    this.registerInclusionResolver('Revision_Orden', this.Revision_Orden.inclusionResolver);
    this.Revision_Tecnico = this.createBelongsToAccessorFor('Revision_Tecnico', tecnicoModelRepositoryGetter,);
    this.registerInclusionResolver('Revision_Tecnico', this.Revision_Tecnico.inclusionResolver);
  }
}
