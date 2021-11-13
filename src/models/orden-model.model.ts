import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ClienteModel} from './cliente-model.model';
import {TecnicoModel} from './tecnico-model.model';

@model()
export class OrdenModel extends Entity {
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
  tipoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoElectrodomestico: string;

  @property({
    type: 'string',
    required: true,
  })
  claseElectrodomestico: string;

  @property({
    type: 'string',
    required: true,
  })
  marcaElectrodomestico: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcionElectrodomestico: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoOrden: string;

  @belongsTo(() => ClienteModel, {name: 'Orden_Cliente'})
  IdCliente: string;

  @belongsTo(() => TecnicoModel, {name: 'Orden_Tecnico'})
  IdTecnico: string;

  constructor(data?: Partial<OrdenModel>) {
    super(data);
  }
}

export interface OrdenModelRelations {
  // describe navigational properties here
}

export type OrdenModelWithRelations = OrdenModel & OrdenModelRelations;
