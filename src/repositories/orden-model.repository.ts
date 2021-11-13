import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {OrdenModel, OrdenModelRelations, ClienteModel, TecnicoModel} from '../models';
import {ClienteModelRepository} from './cliente-model.repository';
import {TecnicoModelRepository} from './tecnico-model.repository';

export class OrdenModelRepository extends DefaultCrudRepository<
  OrdenModel,
  typeof OrdenModel.prototype.id,
  OrdenModelRelations
> {

  public readonly Orden_Cliente: BelongsToAccessor<ClienteModel, typeof OrdenModel.prototype.id>;

  public readonly Orden_Tecnico: BelongsToAccessor<TecnicoModel, typeof OrdenModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteModelRepository') protected clienteModelRepositoryGetter: Getter<ClienteModelRepository>, @repository.getter('TecnicoModelRepository') protected tecnicoModelRepositoryGetter: Getter<TecnicoModelRepository>,
  ) {
    super(OrdenModel, dataSource);
    this.Orden_Tecnico = this.createBelongsToAccessorFor('Orden_Tecnico', tecnicoModelRepositoryGetter,);
    this.registerInclusionResolver('Orden_Tecnico', this.Orden_Tecnico.inclusionResolver);
    this.Orden_Cliente = this.createBelongsToAccessorFor('Orden_Cliente', clienteModelRepositoryGetter,);
    this.registerInclusionResolver('Orden_Cliente', this.Orden_Cliente.inclusionResolver);
  }
}
