import {Entity, model, property, belongsTo} from '@loopback/repository';
import {RevisionModel} from './revision-model.model';

@model()
export class ReparacionModel extends Entity {
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
  disponibilidadRepuestos: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoReparacion: string;

  @property({
    type: 'string',
    required: true,
  })
  idTecnicoRepara: string;

  @property({
    type: 'string',
  })
  IdTecnicoRevisa?: string;

  @belongsTo(() => RevisionModel, {name: 'Reparacion_Revision'})
  IdRevision: string;

  constructor(data?: Partial<ReparacionModel>) {
    super(data);
  }
}

export interface ReparacionModelRelations {
  // describe navigational properties here
}

export type ReparacionModelWithRelations = ReparacionModel & ReparacionModelRelations;
