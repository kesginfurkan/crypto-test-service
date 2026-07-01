import {DomainEvent} from './domain-event';
import {DomainEvents} from './domain-events';
import {Entity} from './entity';

export abstract class AggregateRoot<TProps> extends Entity<TProps> {
    private domainEvents: DomainEvent[]=[];

    protected addDomainEvent(domainEvent:DomainEvent):void {
        this.domainEvents.push(domainEvent);
        DomainEvents.markAggregateForDispatch(this);
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