import {UniqueEntityId} from './unique-entity-id';

export abstract class Entity<TProps> {
    protected readonly props: TProps;
    private readonly _id: UniqueEntityId;

    protected constructor(props:TProps, id?:UniqueEntityId) {
        this.props = props;
        this._id = id ?? new UniqueEntityId();
    }

    get id(): UniqueEntityId {
        return this._id;
    }

    equals(entity?:Entity<TProps>):boolean{
        if(!entity) {
            return false;
        }

        return this.id.equals(entity.id);
    }
}