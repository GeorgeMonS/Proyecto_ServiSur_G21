import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TecnicoModel} from './tecnico-model.model';
import {OrdenModel} from './orden-model.model';

@model()
export class RevisionModel extends Entity {
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
  idTecnicoRevisa: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  recargoRevision: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoRevision: string;

  @property({
    type: 'string',
    required: true,
  })
  diagnostico: string;

  @property({
    type: 'number',
    required: true,
  })
  costoReparacion: number;

  @property({
    type: 'string',
    required: true,
  })
  idCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  aprobadoPorCliente: string;

  @belongsTo(() => TecnicoModel, {name: 'Revision_Tecnico'})
  IdTecnicoRevisa: string;

  @belongsTo(() => OrdenModel, {name: 'Revision_Orden'})
  IdOrden: string;

  constructor(data?: Partial<RevisionModel>) {
    super(data);
  }
}

export interface RevisionModelRelations {
  // describe navigational properties here
}

export type RevisionModelWithRelations = RevisionModel & RevisionModelRelations;
