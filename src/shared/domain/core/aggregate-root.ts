import {DomainEvent} from './domain-event';
import {Entity} from './entity';

export abstract class AggregateRoot<TProps> extends Entity<TProps> {
    private domainEvents: DomainEvent[]=[];

    protected addDomainEvent(domainEvent:DomainEvent):void {
        this.domainEvents.push(domainEvent);
    }

    pullDomainEvents():DomainEvent[] {
        const events = [...this.domainEvents];
        this.domainEvents = [];

        return events;
    }

    getDomainEvents(): DomainEvent[] {
        return [...this.domainEvents];
    }
}