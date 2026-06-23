export abstract class Mapper<TSource, TDestination> {
    abstract map(source:TSource):TDestination;
}