export abstract class CommandHandler<TCommand, TResult> {
    abstract execute(command:TCommand):Promise<TResult>;
}