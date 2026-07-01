import {AggregateRoot} from './aggregate-root';
import {DomainEvent} from './domain-event';
import {UniqueEntityId} from './unique-entity-id';

type EventHandler = (event:DomainEvent) => Promise<void> | void;

export class DomainEvents {
    private static handlersMap : Map<string, EventHandler[]> = new Map();
    private static markedAggregates : AggregateRoot<unknown>[] = [];

    static markAggregateForDispatch(aggregate:AggregateRoot<unknown>):void{
        const aggregateFound = this.findMarkedAggregateById(aggregate.id);

        if(!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }

    static register(callback:EventHandler, eventName:string):void{
        const handlers = this.handlersMap.get(eventName) ?? [];

        handlers.push(callback);

        this.handlersMap.set(eventName,handlers);
    }

    static async dispatchEventsForAggregate(id:UniqueEntityId):Promise<void>{
        const aggregate = this.findMarkedAggregateById(id);

        if(!aggregate) {
            return;
        }

        await this.dispatchAggregateEvents(aggregate);

        aggregate.pullDomainEvents();

        this.removeAggregateFromMarkedDispatchList(aggregate);
    }

    private static async dispatchAggregateEvents(
        aggregate: AggregateRoot<unknown>,
    ): Promise<void> {
        const events = aggregate.getDomainEvents();

        for(const event of events) {
            const handlers = this.handlersMap.get(event.eventName) ?? [];

            for(const handler of handlers) {
                await handler(event);
            }
        }
    }

    private static findMarkedAggregateById(id:UniqueEntityId): AggregateRoot<unknown> | undefined {
        return this.markedAggregates.find((aggregate) => 
            aggregate.id.equals(id),
        );
    }

    private static removeAggregateFromMarkedDispatchList(aggregate:AggregateRoot<unknown>):void {
        this.markedAggregates = this.markedAggregates.filter(
            (markedAggregate) => !markedAggregate.equals(aggregate),
        );
    }
}