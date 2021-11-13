import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {PersonaModel} from './persona-model.model';
import {OrdenModel} from './orden-model.model';

@model()
export class ClienteModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => PersonaModel, {name: 'persona_cliente'})
  IdPersona: string;

  @hasMany(() => OrdenModel, {keyTo: 'IdCliente'})
  ordenes: OrdenModel[];

  constructor(data?: Partial<ClienteModel>) {
    super(data);
  }
}

export interface ClienteModelRelations {
  // describe navigational properties here
}

export type ClienteModelWithRelations = ClienteModel & ClienteModelRelations;
