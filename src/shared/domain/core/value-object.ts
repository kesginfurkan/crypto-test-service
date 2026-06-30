export abstract class ValueObject<TProps> {
    protected readonly props: TProps;

    protected constructor(props:TProps) {
        this.props = Object.freeze(props);
    }

    equals(valueObject?:ValueObject<TProps>):boolean {
        if(!valueObject) {
            return false;
        }

        return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
    }
}