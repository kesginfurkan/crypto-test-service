export abstract class UseCaseHandler<TUseCase,TResult> {
   abstract execute(useCase:TUseCase): Promise<TResult>;
}