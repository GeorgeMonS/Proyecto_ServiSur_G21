import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PersonaModel, PersonaModelRelations} from '../models';

export class PersonaModelRepository extends DefaultCrudRepository<
  PersonaModel,
  typeof PersonaModel.prototype.id,
  PersonaModelRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PersonaModel, dataSource);
  }
}
