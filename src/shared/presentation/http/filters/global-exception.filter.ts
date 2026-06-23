import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    HttpException
} from '@nestjs/common';

import {DomainException} from '../../../domain/errors/domain.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse();

        if(exception instanceof DomainException) {
            response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                error: exception.message,
            });

            return;
        }

        if(exception instanceof HttpException) {
            response.status(exception.getStatus()).json({
                success: false,
                error: exception.message
            });

            return;
        }

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error: "Internal Server Error",
        });

    }
}