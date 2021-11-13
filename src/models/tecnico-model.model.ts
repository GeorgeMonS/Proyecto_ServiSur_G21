import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {PersonaModel} from './persona-model.model';
import {OrdenModel} from './orden-model.model';
import {RevisionModel} from './revision-model.model';
import {ReparacionModel} from './reparacion-model.model';

@model()
export class TecnicoModel extends Entity {
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
  especialidadTecnico: string;

  @property({
    type: 'date',
    required: true,
  })
  horarioDisponible: string;

  @belongsTo(() => PersonaModel, {name: 'persona_tecnico'})
  IdPersona: string;

  @hasMany(() => OrdenModel, {keyTo: 'IdTecnico'})
  Ordenes: OrdenModel[];

  @hasMany(() => RevisionModel, {keyTo: 'IdTecnico'})
  Revisiones: RevisionModel[];

  @hasMany(() => ReparacionModel, {keyTo: 'IdTecnico'})
  Reparaciones: ReparacionModel[];

  constructor(data?: Partial<TecnicoModel>) {
    super(data);
  }
}

export interface TecnicoModelRelations {
  // describe navigational properties here
}

export type TecnicoModelWithRelations = TecnicoModel & TecnicoModelRelations;
