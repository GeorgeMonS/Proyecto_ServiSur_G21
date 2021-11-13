import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ClienteModel, ClienteModelRelations, PersonaModel, OrdenModel} from '../models';
import {PersonaModelRepository} from './persona-model.repository';
import {OrdenModelRepository} from './orden-model.repository';

export class ClienteModelRepository extends DefaultCrudRepository<
  ClienteModel,
  typeof ClienteModel.prototype.id,
  ClienteModelRelations
> {

  public readonly persona_cliente: BelongsToAccessor<PersonaModel, typeof ClienteModel.prototype.id>;

  public readonly ordenes: HasManyRepositoryFactory<OrdenModel, typeof ClienteModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaModelRepository') protected personaModelRepositoryGetter: Getter<PersonaModelRepository>, @repository.getter('OrdenModelRepository') protected ordenModelRepositoryGetter: Getter<OrdenModelRepository>,
  ) {
    super(ClienteModel, dataSource);
    this.ordenes = this.createHasManyRepositoryFactoryFor('ordenes', ordenModelRepositoryGetter,);
    this.registerInclusionResolver('ordenes', this.ordenes.inclusionResolver);
    this.persona_cliente = this.createBelongsToAccessorFor('persona_cliente', personaModelRepositoryGetter,);
    this.registerInclusionResolver('persona_cliente', this.persona_cliente.inclusionResolver);
  }
}
