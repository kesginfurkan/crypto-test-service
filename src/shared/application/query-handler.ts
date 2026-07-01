export abstract class QueryHandler<TQuery,TResponse> {
    abstract execute(query:TQuery):Promise<TResponse>;
}