export type GuardResult = {
    succeeded:boolean;
    message?:string;
}

export class Guard {
    static againstNullOrUndefined(value:unknown,argumentName:string):GuardResult {
        if(value === null || value === undefined) {
            return {
                succeeded:false,
                message: `${argumentName} is null or undefined`,
            };
        }

        return { succeeded:true };
    }

    static againstEmptyString(value:string, argumentName:string): GuardResult {
        if(!value || value.trim().length === 0) {
            return {
                succeeded:false,
                message: `${argumentName} is empty`
            }
        }

        return { succeeded:true };
    }
}