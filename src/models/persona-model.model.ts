import {Entity, model, property} from '@loopback/repository';

@model()
export class PersonaModel extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  documentoID: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;


  constructor(data?: Partial<PersonaModel>) {
    super(data);
  }
}

export interface PersonaModelRelations {
  // describe navigational properties here
}

export type PersonaModelWithRelations = PersonaModel & PersonaModelRelations;
