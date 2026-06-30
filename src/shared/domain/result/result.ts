import { Res } from "@nestjs/common";

export class Result<T> {
    private constructor(
        public readonly isSuccess:boolean,
        public readonly error?:string,
        public readonly value?:T,
    ) {}

    static ok<T>(value?:T):Result<T> {
        return new Result<T>(true, undefined, value);
    }

    static fail<T>(error:string):Result<T> {
        return new Result<T>(false, error);
    }

    getValue():T {
        if(!this.isSuccess) {
            throw new Error('Cannot get value of failed result');
        }

        return this.value as T;
    }
}