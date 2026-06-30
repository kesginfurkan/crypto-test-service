import {UniqueEntityId} from './unique-entity-id';

export interface DomainEvent {
    aggregateId:UniqueEntityId;
    occuredAt:Date;
    eventName:string;
}