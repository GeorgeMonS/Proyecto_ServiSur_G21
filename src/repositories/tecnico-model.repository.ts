import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TecnicoModel, TecnicoModelRelations, PersonaModel, OrdenModel, RevisionModel, ReparacionModel} from '../models';
import {PersonaModelRepository} from './persona-model.repository';
import {OrdenModelRepository} from './orden-model.repository';
import {RevisionModelRepository} from './revision-model.repository';
import {ReparacionModelRepository} from './reparacion-model.repository';

export class TecnicoModelRepository extends DefaultCrudRepository<
  TecnicoModel,
  typeof TecnicoModel.prototype.id,
  TecnicoModelRelations
> {

  public readonly persona_tecnico: BelongsToAccessor<PersonaModel, typeof TecnicoModel.prototype.id>;

  public readonly Ordenes: HasManyRepositoryFactory<OrdenModel, typeof TecnicoModel.prototype.id>;

  public readonly Revisiones: HasManyRepositoryFactory<RevisionModel, typeof TecnicoModel.prototype.id>;

  public readonly Reparaciones: HasManyRepositoryFactory<ReparacionModel, typeof TecnicoModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaModelRepository') protected personaModelRepositoryGetter: Getter<PersonaModelRepository>, @repository.getter('OrdenModelRepository') protected ordenModelRepositoryGetter: Getter<OrdenModelRepository>, @repository.getter('RevisionModelRepository') protected revisionModelRepositoryGetter: Getter<RevisionModelRepository>, @repository.getter('ReparacionModelRepository') protected reparacionModelRepositoryGetter: Getter<ReparacionModelRepository>,
  ) {
    super(TecnicoModel, dataSource);
    this.Reparaciones = this.createHasManyRepositoryFactoryFor('Reparaciones', reparacionModelRepositoryGetter,);
    this.registerInclusionResolver('Reparaciones', this.Reparaciones.inclusionResolver);
    this.Revisiones = this.createHasManyRepositoryFactoryFor('Revisiones', revisionModelRepositoryGetter,);
    this.registerInclusionResolver('Revisiones', this.Revisiones.inclusionResolver);
    this.Ordenes = this.createHasManyRepositoryFactoryFor('Ordenes', ordenModelRepositoryGetter,);
    this.registerInclusionResolver('Ordenes', this.Ordenes.inclusionResolver);
    this.persona_tecnico = this.createBelongsToAccessorFor('persona_tecnico', personaModelRepositoryGetter,);
    this.registerInclusionResolver('persona_tecnico', this.persona_tecnico.inclusionResolver);
  }
}
